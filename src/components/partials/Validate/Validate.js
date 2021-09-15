import React, { useRef, useState } from 'react';
import Files from 'react-files'
import Button from 'react-bootstrap/Button';
import UploadFileList from '../UploadFileList/UploadFileList';
import { sendAsync } from 'utils/api';

const VALIDATE_URL = process.env.REACT_APP_VALIDATE_URL;

function Validate({ validator, onApiResponse }) {
   const [files, setFiles] = useState([]);
   const uploadElement = useRef(null);

   if (!validator) {
      return null;
   }

   function onFilesChange(files) {
      setFiles(files);
   }

   async function validate() {
      const formData = new FormData();

      formData.append('namespace', validator.namespace);
      files.forEach(file => formData.append('files', file));

      const response = await sendAsync(VALIDATE_URL, formData, { headers: { 'Content-Type': 'multipart/form-data' } });

      if (response) {
         onApiResponse(response);
        // uploadElement.current.removeFiles();
      }
   }

   return (
      <React.Fragment>
         <Files
            ref={uploadElement}
            className='files-dropzone'
            onChange={onFilesChange}
            accepts={validator.fileTypes}
            multiple
            maxFiles={10}
            maxFileSize={10000000}
            minFileSize={0}
            clickable
         >
            Slipp filer her eller klikk for å laste opp
         </Files>

         <UploadFileList files={files} uploadElement={uploadElement} />

         <Button variant="primary" onClick={validate} disabled={!files.length}>Validér</Button>
      </React.Fragment>
   )
}

export default Validate;