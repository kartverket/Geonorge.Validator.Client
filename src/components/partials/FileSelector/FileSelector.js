import { Fragment, useContext, useEffect, useRef, useState } from 'react';
import Files from 'react-files'
import { Button, Spinner } from 'react-bootstrap';
import UploadFileList from '../UploadFileList/UploadFileList';
import fileSize from 'filesize';
import { Tooltip } from 'components/custom-elements';
import { useWizard } from 'react-use-wizard';
import { ValidationContext } from 'context';
import { useApi } from 'hooks';
import { useSelector } from 'react-redux';

const MAX_FILE_SIZE_TOTAL = process.env.REACT_APP_MAX_FILE_SIZE_TOTAL;
const RULESETS_API_URL = process.env.REACT_APP_RULESETS_API_URL;
const API_TASK_ID = 'rule-selector';

function FileSelector() {
   const { files, setFiles, schemas, setSchemas, setRulesets } = useContext(ValidationContext);
   const [fileSizeTotal, setFileSizeTotal] = useState(0);
   const apiTasks = useSelector(state => state.progress.tasks);
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
                     accepts={['.xml', '.gml', '.json', '.geojson']}
                     multiple
                     clickable
                  >
                     <i>Klikk for å legge til datasett (GML, XML, JSON, GEOJSON)</i>

                     <Tooltip
                        tooltip="Hvis flere filer, må alle benytte samme applikasjonsskjema"
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
                     accepts={['.xsd', '.json']}
                     maxFiles={1}
                     clickable
                  >
                     <i>Klikk for å legge til applikasjonsskjema (XSD, JSON)</i>

                     <Tooltip
                        tooltip={"Valgfri dersom applikasjonsskjema er inkludert i datasettet"}
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
               {
                  apiTasks.includes(API_TASK_ID) ?
                     <Spinner animation="border" role="status" /> :
                     null
               }
            </div>
         </div>
      </Fragment>
   )
}

export default FileSelector;