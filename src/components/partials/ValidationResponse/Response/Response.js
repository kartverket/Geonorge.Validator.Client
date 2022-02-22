import React from 'react';
import { Button, Overlay } from 'react-bootstrap';
import { sendAsync } from 'utils/api';
import ResponseBlock from '../ResponseBlock/ResponseBlock';
import Tooltip from 'hooks/useTooltip';
import './Response.scss';

const MAP_DOCUMENT_API_URL = process.env.REACT_APP_MAP_DOCUMENT_API_URL;

function Response({ data }) {
   
   if (!data) {
      return null;
   }

   const validationResult = data.validationResult;
   const rulesWithMessages = validationResult.rules.filter(rule => rule.messages.length > 0);
   const passedRules = validationResult.rules.filter(rule => rule.status === 'PASSED');
   const skippedRules = validationResult.rules.filter(rule => rule.status === 'SKIPPED');
   const rulesCheckedCount = rulesWithMessages.length + passedRules.length;
   const timeUsed = validationResult.timeUsed.toString().replace('.', ',');
   
   async function createMapDocument(file) {
      debugger
      const formData = new FormData();

      formData.append('gmlFile', file);
      formData.append('validate', false);

      const response = await sendAsync(MAP_DOCUMENT_API_URL, formData, { headers: { 'Content-Type': 'multipart/form-data' } });

      debugger;
   }

   function getFileLinks(mapFiles) {
      return mapFiles.map((mapFile, index) => {
         if (!mapFile.messages.length) {
            return <Button key={'file-' + index} variant="link" onClick={() => createMapDocument(mapFile.file)}>{mapFile.fileName}</Button>
         } else {
            return (
               <Tooltip key={'file-' + index} tooltip={'Blah'} trigger={<span>Hore</span>}>
                  
               </Tooltip>
            )
         }
      });
   }

   return (
      <React.Fragment>
         <div className="summary">
            <div className="row">
               <div className="col-2">Navneområde:</div>
               <div className="col-10">{validationResult.namespace}</div>
            </div>
            <div className="row">
               <div className="col-2">Datasett:</div>
               <div className="col-10">{getFileLinks(data.mapFiles)}</div>
            </div>
            <div className="row">
               <div className="col-2">Antall feil:</div>
               <div className="col-10">{validationResult.errors}</div>
            </div>
            <div className="row">
               <div className="col-2">Antall advarsler:</div>
               <div className="col-10">{validationResult.warnings}</div>
            </div>
            <div className="row">
               <div className="col-2">Antall regler sjekket:</div>
               <div className="col-10">{rulesCheckedCount}</div>
            </div>
            <div className="row">
               <div className="col-2">Antall regler totalt:</div>
               <div className="col-10">{validationResult.rules.length}</div>
            </div>
            <div className="row">
               <div className="col-2">Tidsbruk:</div>
               <div className="col-10">{timeUsed} sek.</div>
            </div>
         </div>

         <ResponseBlock list={rulesWithMessages} title="Regler med feil eller advarsler" expandable={false} maxHeight={false} />
         <ResponseBlock list={passedRules} title="Validerte regler" />
         <ResponseBlock list={skippedRules} title="Regler som ikke er sjekket" />
      </React.Fragment>
   );
}

export default Response