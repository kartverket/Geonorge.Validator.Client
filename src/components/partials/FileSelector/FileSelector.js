import React, { Fragment, useContext, useEffect, useRef, useState } from 'react';
import Files from 'react-files'
import { Button, Spinner } from 'react-bootstrap';
import UploadFileList from '../UploadFileList/UploadFileList';
import { filesize } from 'filesize';
import Url from 'url-parse';
import { Tooltip } from 'components/custom-elements';
import { useWizard } from 'react-use-wizard';
import { ValidationContext } from 'context';
import { useApi } from 'hooks';
import { useSelector } from 'react-redux';
import { getSchemaUriFromFiles } from 'utils/file-helper';
import ReactSelect from 'react-select';
import './FileSelector.scss';

const MAX_FILE_SIZE_TOTAL = process.env.REACT_APP_MAX_FILE_SIZE_TOTAL;
const RULESETS_API_URL = process.env.REACT_APP_RULESETS_API_URL;
const RULESETS_API_TASK_ID = 'rule-selector';

function FileSelector() {
   const { files, setFiles, schemas, setSchemas, schemaRegistryOptions, schemaUri, setSchemaUri, setRulesets } = useContext(ValidationContext);
   const [fileSizeTotal, setFileSizeTotal] = useState(0);
   const [schemaVersionOptions, setSchemaVersionOptions] = useState([]);
   const [selectedSchemaRegistryEntry, setSelectedSchemaRegistryEntry] = useState(null);
   const [selectedSchemaVersion, setSelectedSchemaVersion] = useState(null);
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

   useEffect(
      () => {
         if (selectedSchemaVersion) {
            setSchemaUri(selectedSchemaVersion.documentReference);
         }
      },
      [selectedSchemaVersion, setSchemaUri]
   );

   useEffect(
      () => {
         async function getGeonorgeSchemaFromFiles() {
            const schemaUri = await getSchemaUriFromFiles(files);

            if (schemaUri === null) {
               return;
            }

            const url = new Url(schemaUri);
            const withoutProtocol = url.hostname + url.pathname;

            const schema = schemaRegistryOptions.find(option => {
               return option.versions.some(version => {
                  const docUrl = new Url(version.documentReference);

                  return withoutProtocol === docUrl.hostname + docUrl.pathname;
               });
            });

            if (!schema) {
               return;
            }

            setSchemaVersionOptions(schema.versions)
            setSelectedSchemaRegistryEntry(schema);

            const schemaVersion = schema.versions.find(version => {
               const docUrl = new Url(version.documentReference);
               return withoutProtocol === docUrl.hostname + docUrl.pathname;
            });

            if (schemaVersion) {
               setSelectedSchemaVersion(schemaVersion);
            } else {
               setSelectedSchemaVersion(schema.versions[0]);
            }
         }

         if (files.length) {
            getGeonorgeSchemaFromFiles();
         } else {
            handleSchemaRegistrySelectChange(null);
         }
      },
      [files, schemaRegistryOptions]
   );

   handleStep(async () => {
      const formData = new FormData();

      await addFileSlicesToFormData(files, 'files', formData);

      if (schemaUri) {
         formData.append('schemaUri', schemaUri);
      } else {
         schemas.forEach(file => formData.append('schema', file));
      }

      const headers = { 'Content-Type': 'multipart/form-data' }
      const response = await post(RULESETS_API_TASK_ID, RULESETS_API_URL, formData, { headers });

      if (response) {
         setRulesets(response);
      }
   });

   function handleFilesAdded(added) {
      const unique = getUniqueFiles(added);
      filesUploadElement.current.setState({ files: [...unique] });
      setFiles(unique);
   }

   function getUniqueFiles(files) {
      const uniqueNames = new Set();

      return files.filter(file => {
         const isDuplicate = uniqueNames.has(file.name);
         uniqueNames.add(file.name);

         return !isDuplicate;
      });
   }

   async function addFileSlicesToFormData(files, name, formData) {
      for (let i = 0; i < files.length; i++) {
         const file = files[i];
         const sliced = await file.slice(0, 50000);
         formData.append(name, sliced);
      }
   }

   function renderTotalFileSize() {
      const options = { separator: ',', standard: 'jedec' };
      const maxTotalSize = filesize(MAX_FILE_SIZE_TOTAL, options);

      return (
         <div className={`total-file-size ${fileSizeTotal > MAX_FILE_SIZE_TOTAL ? 'total-file-size-exceeded' : ''}`}>
            {
               fileSizeTotal === 0 ?
                  <span>Maks. total filstørrelse: {maxTotalSize}</span> :
                  <span>Total filstørrelse: <span className="file-size-total">{filesize(fileSizeTotal, options)}</span> (maks. {maxTotalSize})</span>
            }
         </div>
      );
   }

   function handleSchemaRegistrySelectChange(option) {
      setSelectedSchemaRegistryEntry(option);
      setSchemaVersionOptions(option?.versions || [])
      setSelectedSchemaVersion(option?.versions[0]);
   }

   function handleSchemaVersionChange(option) {
      setSelectedSchemaVersion(option);
   }

   return (
      <Fragment>
         <div className="file-selector">
            <div className="uploads">
               <div>
                  <Files
                     ref={filesUploadElement}
                     className='files-dropzone'
                     onChange={handleFilesAdded}
                     accepts={['.xml', '.gml', '.json', '.geojson']}
                     multiple
                     clickable
                  >
                     <i>Klikk for å legge til datasett (.gml, .xml, .geojson, .json)</i>

                     <Tooltip
                        tooltip="Hvis flere filer, må alle være av samme type og benytte samme applikasjonsskjema"
                        trigger={
                           <span className="file-info">?</span>
                        }
                     >
                     </Tooltip>
                  </Files>

                  <UploadFileList files={files} uploadElement={filesUploadElement} />
               </div>
               <div className="application-schema">
                  <div className="application-schema__upload">
                     <div style={!schemas.length ? { display: 'block' } : { display: 'none' }}>
                        <Files
                           ref={schemaUploadElement}
                           className='files-dropzone'
                           onChange={setSchemas}
                           accepts={['.xsd', '.json']}
                           maxFiles={1}
                           clickable
                        >
                           <i>Klikk for å legge til applikasjonsskjema (.xsd, .json)</i>
                        </Files>
                     </div>

                     <UploadFileList files={schemas} uploadElement={schemaUploadElement} />
                  </div>

                  <div className="application-schema__label">
                     eller velg et GML-applikasjonsskjema fra <a href="https://register.geonorge.no/gml-applikasjonsskjema" target="_blank" rel="noreferrer">register.geonorge.no</a>:
                  </div>

                  <div className="application-schema__geonorge">
                     <div className="application-schema__geonorge__select">
                        <div>
                           <ReactSelect
                              options={schemaRegistryOptions}
                              getOptionValue={option => option.id}
                              onChange={handleSchemaRegistrySelectChange}
                              value={selectedSchemaRegistryEntry}
                              isClearable={true}
                              placeholder="Velg applikasjonsskjema..."
                              classNamePrefix="validator"
                           />
                        </div>
                        <div style={schemaVersionOptions.length ? { display: 'block' } : { display: 'none' }}>
                           <ReactSelect
                              options={schemaVersionOptions}
                              getOptionLabel={option => `${option.versionName}\u0020\u0020\u0020(${option.status})`}
                              getOptionValue={option => option.documentReference}
                              onChange={handleSchemaVersionChange}
                              value={selectedSchemaVersion}
                              classNamePrefix="validator"
                           />
                        </div>
                     </div>
                     {
                        selectedSchemaVersion ?
                           <div className="application-schema__geonorge__docref">
                              <a
                                 href={selectedSchemaVersion.documentReference}
                                 title={selectedSchemaVersion.documentReference}
                                 target="_blank"
                                 rel="noreferrer">
                                 {selectedSchemaVersion.documentReference}
                              </a>
                           </div> :
                           null
                     }
                  </div>
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
                  apiTasks.includes(RULESETS_API_TASK_ID) ?
                     <Spinner animation="border" role="status" /> :
                     null
               }
            </div>
         </div>
      </Fragment>
   )
}

export default FileSelector;