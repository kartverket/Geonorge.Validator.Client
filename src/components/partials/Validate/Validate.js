import React, { useEffect, useRef, useState } from 'react';
import { HubConnectionBuilder } from '@microsoft/signalr';
import { useSelector } from 'react-redux';
import { useApi } from 'hooks';
import Files from 'react-files'
import { Button, ProgressBar } from 'react-bootstrap';
import UploadFileList from '../UploadFileList/UploadFileList';
import fileSize from 'filesize';
import { validateFilesForMapView } from 'utils/file-validator';
import { Tooltip } from 'components/custom-elements';
import './Validate.scss';

const VALIDATE_API_URL = process.env.REACT_APP_VALIDATE_API_URL;
const SIGNAL_R_HUB_URL = process.env.REACT_APP_SIGNAL_R_HUB_URL;
const MAX_FILE_SIZE_TOTAL = process.env.REACT_APP_MAX_FILE_SIZE_TOTAL;
const API_TASK_ID = 'validation';

function Validate({ onApiResponse }) {
   const [connection, setConnection] = useState(null);
   const [connectionId, setConnectionId] = useState(null);
   const [notification, setNotification] = useState(null);
   const [xmlFiles, setXmlFiles] = useState([]);
   const [xsdFiles, setXsdFiles] = useState([]);
   const [fileSizeTotal, setFileSizeTotal] = useState(0);
   const [showProgressBar, setShowProgressBar] = useState(false);
   const [validating, setValidating] = useState(false);
   const apiTasks = useSelector(state => state.api.tasks);
   const uploadProgress = useSelector(state => state.api.uploadProgress);
   const xmlUploadElement = useRef(null);
   const xsdUploadElement = useRef(null);
   const sendAsync = useApi();

   useEffect(
      () => {
         const newConnection = new HubConnectionBuilder()
            .withUrl(SIGNAL_R_HUB_URL)
            .withAutomaticReconnect({
               nextRetryDelayInMilliseconds: _ => 5000
            })
            .build();

         newConnection.onreconnected(connectionId => setConnectionId(connectionId));

         setConnection(newConnection);
      },
      []
   );

   useEffect(
      () => {
         if (!connection) {
            return;
         }

         async function connect() {
            try {
               await connection.start();
               setConnectionId(connection.connectionId);
               connection.on('ReceiveMessage', message => setNotification(message));
            } catch (error) {
               console.log('Tilkobling mislyktes: ', error);
            }
         }

         connect();
      },
      [connection]
   );

   useEffect(
      () => {
         setValidating(apiTasks.includes(API_TASK_ID));
      },
      [apiTasks]
   );

   useEffect(
      () => {
         setShowProgressBar(uploadProgress.taskId === API_TASK_ID);
      },
      [uploadProgress]
   );

   useEffect(
      () => {
         const fileSizeTotal = xmlFiles
            .concat(xsdFiles)
            .map(file => file.size)
            .reduce((size1, size2) => size1 + size2, 0);

         setFileSizeTotal(fileSizeTotal);
      },
      [xmlFiles, xsdFiles]
   );

   async function validate() {
      onApiResponse(null);

      const formData = new FormData();

      xmlFiles.forEach(file => formData.append('xmlFiles', file));
      xsdFiles.forEach(file => formData.append('xsdFile', file));

      setNotification('Laster opp');

      const headers = { 'Content-Type': 'multipart/form-data', 'SignalR-ConnectionId': connectionId }
      const response = await sendAsync(API_TASK_ID, VALIDATE_API_URL, formData, { headers });

      if (response) {
         onApiResponse({
            validationResult: response,
            files: await validateFilesForMapView(xmlFiles, response)
         });

         xmlUploadElement.current.removeFiles();
         xsdUploadElement.current.removeFiles();
      }
   }

   function renderTotalFileSize() {
      const options = { separator: ',', standard: 'jedec' };
      const maxTotalSize = fileSize(MAX_FILE_SIZE_TOTAL, options);

      return (
         <div className={`total-file-size ${fileSizeTotal > MAX_FILE_SIZE_TOTAL ? 'total-file-size-exceeded' : ''}`}>
            {
               fileSizeTotal === 0 ?
                  <span>Maks. total filstørrelse: {maxTotalSize}</span> :
                  <span>Total filstørrelse: <span className="file-size-total">{fileSize(fileSizeTotal, options)}</span> (maks. {maxTotalSize})</span>
            }
         </div>
      );
   }

   return (
      <React.Fragment>
         <div className="uploads">
            <div>
               <Files
                  ref={xmlUploadElement}
                  className='files-dropzone'
                  onChange={setXmlFiles}
                  accepts={['.xml', '.gml']}
                  multiple
                  clickable
               >
                  <i>Klikk for å legge til GML- eller XML-filer</i>

                  <Tooltip
                     tooltip="Hvis flere filer, må alle tilhøre samme navneområde med samme versjon av applikasjonsskjema"
                     trigger={
                        <span className="file-info">?</span>
                     }
                  >
                  </Tooltip>
               </Files>

               <UploadFileList files={xmlFiles} uploadElement={xmlUploadElement} />
            </div>
            <div>
               <Files
                  ref={xsdUploadElement}
                  className='files-dropzone'
                  onChange={setXsdFiles}
                  accepts={['.xsd']}
                  maxFiles={1}
                  clickable
               >
                  <i>Klikk for å legge til applikasjonsskjema (XSD)</i>

                  <Tooltip
                     tooltip={"Valgfri dersom attributtet \"schemaLocation\" er spesifisert"}
                     trigger={
                        <span className="file-info">?</span>
                     }
                  >
                  </Tooltip>
               </Files>

               <UploadFileList files={xsdFiles} uploadElement={xsdUploadElement} />
            </div>
         </div>

         <div className="validator-info">
            {renderTotalFileSize()}
         </div>

         <div className="validate-button">
            <Button variant="primary" onClick={validate} disabled={!xmlFiles.length || fileSizeTotal > MAX_FILE_SIZE_TOTAL || validating}>Validér</Button>

            <div className={`validating-progress ${!showProgressBar ? 'validating-progress-hidden' : ''}`}>
               <ProgressBar now={uploadProgress.completed} animated />
               <span className="loading">{notification}</span>
            </div>
         </div>
      </React.Fragment>
   )
}

export default Validate;