import { Fragment, useContext, useEffect, useRef, useState } from 'react';
import { useApi } from 'hooks';
import Files from 'react-files'
import { Button } from 'react-bootstrap';
import UploadFileList from '../UploadFileList/UploadFileList';
import fileSize from 'filesize';
import { Tooltip } from 'components/custom-elements';
import { useWizard } from 'react-use-wizard';
import { ValidationContext } from 'context';

const RULESETS_API_URL = process.env.REACT_APP_RULESETS_API_URL;
const MAX_FILE_SIZE_TOTAL = process.env.REACT_APP_MAX_FILE_SIZE_TOTAL;
const API_TASK_ID = 'file-selector';

function FileSelector() {
   const { files, setFiles, schemas, setSchemas, setRulesets } = useContext(ValidationContext);
   const [fileSizeTotal, setFileSizeTotal] = useState(0);
   const filesUploadElement = useRef(null);
   const schemaUploadElement = useRef(null);
   const { handleStep, nextStep } = useWizard();
   const { post } = useApi();

   useEffect(
      () => {
         const fileSizeTotal = files
            .concat(schemas)
            .map(file => file.size)
            .reduce((size1, size2) => size1 + size2, 0);

         setFileSizeTotal(fileSizeTotal);
      },
      [files, schemas]
   );

   handleStep(async () => {
      const formData = new FormData();

      await addFileSlicesToFormData(files, 'files', formData);
      await addFileSlicesToFormData(schemas, 'schema', formData);

      const headers = { 'Content-Type': 'multipart/form-data' }
      const response = await post(API_TASK_ID, RULESETS_API_URL, formData, { headers });

      if (response) {
         setRulesets(response);
      }
   });

   async function addFileSlicesToFormData(files, name, formData) {
      for (let i = 0; i < files.length; i++) {
         const file = files[i];
         const sliced = await file.slice(0, 50000);
         formData.append(name, sliced);
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
      <Fragment>
         <div className="file-selector">
            <div className="uploads">
               <div>
                  <Files
                     ref={filesUploadElement}
                     className='files-dropzone'
                     onChange={setFiles}
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

                  <UploadFileList files={files} uploadElement={filesUploadElement} />
               </div>
               <div>
                  <Files
                     ref={schemaUploadElement}
                     className='files-dropzone'
                     onChange={setSchemas}
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

                  <UploadFileList files={schemas} uploadElement={schemaUploadElement} />
               </div>
            </div>
         </div>

         <div className="validator-info">
            {renderTotalFileSize()}
         </div>

         <div className="wizard-footer">
            <div className="wizard-footer__buttons">
               <Button variant="primary" className="button__next" onClick={() => nextStep()} disabled={!files.length || fileSizeTotal > MAX_FILE_SIZE_TOTAL}>Neste</Button>
            </div>
         </div>

         <div className="validate-button">

         </div>
      </Fragment>
   )
}

export default FileSelector;