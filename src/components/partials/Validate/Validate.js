import React, { useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import Files from 'react-files'
import { Button, Spinner } from 'react-bootstrap';
import UploadFileList from '../UploadFileList/UploadFileList';
import { sendAsync } from 'utils/api';
import './Validate.scss';

const VALIDATE_URL = process.env.REACT_APP_VALIDATE_URL;

function Validate({ onApiResponse }) {
   const [xmlFiles, setXmlFiles] = useState([]);
   const [xsdFiles, setXsdFiles] = useState([]);
   const apiLoading = useSelector(state => state.api.loading);
   const xmlUploadElement = useRef(null);
   const xsdUploadElement = useRef(null);

   async function validate() {
      onApiResponse(null);

      const formData = new FormData();

      xmlFiles.forEach(file => formData.append('xmlFiles', file));
      xsdFiles.forEach(file => formData.append('xsdFile', file));

      const response = await sendAsync(VALIDATE_URL, formData, { headers: { 'Content-Type': 'multipart/form-data' } });

      if (response) {
         onApiResponse(response);
         xmlUploadElement.current.removeFiles();
         xsdUploadElement.current.removeFiles();
      }
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
                  maxFiles={10}
                  maxFileSize={10000000}
                  minFileSize={0}
                  clickable
               >
                  Klikk for å legge til XML- eller GML-dokumenter *
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
                  maxFileSize={10000000}
                  minFileSize={0}
                  clickable
               >
                  Klikk for å legge til applikasjonsskjema (XSD) **
               </Files>

               <UploadFileList files={xsdFiles} uploadElement={xsdUploadElement} />
            </div>
         </div>
         <div className="bottom">
            <div className="validate-button">
               <Button variant="primary" onClick={validate} disabled={!xmlFiles.length}>Validér</Button>
               {
                  apiLoading ?
                     <Spinner animation="border" /> :
                     null
               }
            </div>
            <div className="footnotes">
               * Må tilhøre samme navneområde med samme versjon av applikasjonsskjema<br />
               ** Valgfri dersom attributten "xsi:schemaLocation" er spesifisert
            </div>
         </div>
      </React.Fragment>
   )
}

export default Validate;