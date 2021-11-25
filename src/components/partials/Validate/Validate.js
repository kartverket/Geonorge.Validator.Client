import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import Files from 'react-files'
import { Button, Spinner } from 'react-bootstrap';
import UploadFileList from '../UploadFileList/UploadFileList';
import { sendAsync } from 'utils/api';
import fileSize from 'filesize';
import './Validate.scss';

const VALIDATE_URL = process.env.REACT_APP_VALIDATE_URL;
const MAX_FILE_SIZE_TOTAL = 200000000;

function Validate({ onApiResponse }) {
   const [xmlFiles, setXmlFiles] = useState([]);
   const [xsdFiles, setXsdFiles] = useState([]);
   const [fileSizeTotal, setFileSizeTotal] = useState(0);
   const apiLoading = useSelector(state => state.api.loading);
   const xmlUploadElement = useRef(null);
   const xsdUploadElement = useRef(null);

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

      const response = await sendAsync(VALIDATE_URL, formData, { headers: { 'Content-Type': 'multipart/form-data' } });

      if (response) {
         onApiResponse(response);
         xmlUploadElement.current.removeFiles();
         xsdUploadElement.current.removeFiles();
      }
   }

   function getTotalFileSize() {
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
                  clickable
               >
                  Klikk for å legge til applikasjonsskjema (XSD) **
               </Files>

               <UploadFileList files={xsdFiles} uploadElement={xsdUploadElement} />
            </div>
         </div>

         {getTotalFileSize()}

         <div className="bottom">
            <div className="validate-button">
               <Button variant="primary" onClick={validate} disabled={!xmlFiles.length || fileSizeTotal > MAX_FILE_SIZE_TOTAL}>Validér</Button>
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