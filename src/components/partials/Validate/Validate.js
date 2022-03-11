import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useApi } from 'hooks';
import Files from 'react-files'
import { Button, ProgressBar } from 'react-bootstrap';
import UploadFileList from '../UploadFileList/UploadFileList';
import fileSize from 'filesize';
import { validateFilesForMapView } from 'utils/file-validator';
import './Validate.scss';
import { Tooltip } from 'components/custom-elements';

const VALIDATE_API_URL = process.env.REACT_APP_VALIDATE_API_URL;
const MAX_FILE_SIZE_TOTAL = process.env.REACT_APP_MAX_FILE_SIZE_TOTAL;
const API_TASK_ID = 'validation';

function Validate({ onApiResponse }) {
   const [xmlFiles, setXmlFiles] = useState([]);
   const [xsdFiles, setXsdFiles] = useState([]);
   const [fileSizeTotal, setFileSizeTotal] = useState(0);
   const [validating, setValidating] = useState(false);
   const apiTasks = useSelector(state => state.api.tasks);
   const uploadProgress = useSelector(state => state.api.uploadProgress);
   const xmlUploadElement = useRef(null);
   const xsdUploadElement = useRef(null);
   const sendAsync = useApi();

   useEffect(
      () => {
         setValidating(apiTasks.includes(API_TASK_ID));
      },
      [apiTasks]
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

      const response = await sendAsync(API_TASK_ID, VALIDATE_API_URL, formData, { headers: { 'Content-Type': 'multipart/form-data' } });

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
      const options = { separator: ',' };
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
                  Klikk for å legge til GML- eller XML-dokumenter

                  <Tooltip
                     tooltip="Må tilhøre samme navneområde med samme versjon av applikasjonsskjema"
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
                  Klikk for å legge til applikasjonsskjema (XSD) 
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

            <div className={`validating-progress ${!validating ? 'validating-progress-hidden' : ''}`}>
               <ProgressBar now={uploadProgress} animated />
               <span className="loading">{uploadProgress !== 100 ? 'Laster opp' : 'Validerer'}</span>
            </div>
         </div>
      </React.Fragment>
   )
}

export default Validate;