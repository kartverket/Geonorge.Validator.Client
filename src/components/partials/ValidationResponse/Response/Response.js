import React, { useContext } from 'react';
import { Button } from 'react-bootstrap';
import { useApi } from 'hooks';
import ResponseBlock from '../ResponseBlock/ResponseBlock';
import './Response.scss';
import { JsonPrint, Tooltip } from 'components/custom-elements';
import { MapViewContext } from 'App';
import { useDispatch } from 'react-redux';
import { setActiveTab } from 'store/slices/tabSlice';
import { createId } from 'utils/map/helpers';

const MAP_DOCUMENT_API_URL = process.env.REACT_APP_MAP_DOCUMENT_API_URL;

function Response({ data }) {
   const sendAsync = useApi();
   const [mapViews, setMapViews] = useContext(MapViewContext);
   const dispatch = useDispatch();

   if (!data) {
      return null;
   }

   const result = data.validationResult;
   const rulesWithMessages = result.rules.filter(rule => rule.messages.length > 0);
   const passedRules = result.rules.filter(rule => rule.status === 'PASSED');
   const skippedRules = result.rules.filter(rule => rule.status === 'SKIPPED');
   const rulesCheckedCount = rulesWithMessages.length + passedRules.length;
   const timeUsed = result.timeUsed.toString().replace('.', ',');
   const groupedValidationResult = groupValidationResultByFileName(result);

   async function showInMap(file) {
      let index = mapViews.findIndex(mapView => mapView.mapDocument.fileName === file.name);

      if (index === -1) {
         setMapViews([...mapViews, { mapId: createId(), mapDocument: await fetchMapDocument(file) }]);
      } else {
         const mapId = mapViews[index].mapId;
         dispatch(setActiveTab({ activeTab: mapId }));
      }
   }

   async function fetchMapDocument(file) {
      const formData = new FormData();

      formData.append('gmlFile', file);
      formData.append('validate', false);

      const mapDocument = await sendAsync(MAP_DOCUMENT_API_URL, formData, { headers: { 'Content-Type': 'multipart/form-data' } }, false);
      mapDocument.validationResult.rules = groupedValidationResult.find(result => result.fileName === file.name)?.rules;

      return mapDocument;
   }

   function renderDataSet(files) {
      return files.map((file, index) => {
         if (!file.messages.length) {
            return (
               <div className="file" key={'file-' + index}>
                  {file.fileName}<Button variant="link" onClick={() => showInMap(file.blob)}>(Vis i kart)</Button>
               </div>
            )
         } else {
            return (
               <div className="file file-no-map" key={'file-' + index}>
                  {file.fileName}

                  <Tooltip
                     tooltip={
                        <ul className="file-messages">
                           {file.messages.map((message, idx) => <li key={`msg-${index}-${idx}`}>{message}</li>)}
                        </ul>
                     }
                     trigger={
                        <span>(Vis i kart)</span>
                     }
                  >
                  </Tooltip>
               </div>
            )
         }
      });
   }

   return (
      <React.Fragment>
         <div className="summary">
            <div className="row">
               <div className="col-2">Navneområde:</div>
               <div className="col-10">{result.namespace}</div>
            </div>
            <div className="row">
               <div className="col-2">Datasett:</div>
               <div className="col-10">
                  <div className="dataset">{renderDataSet(data.files)}</div>
               </div>
            </div>
            <div className="row">
               <div className="col-2">Antall feil:</div>
               <div className="col-10">{result.errors}</div>
            </div>
            <div className="row">
               <div className="col-2">Antall advarsler:</div>
               <div className="col-10">{result.warnings}</div>
            </div>
            <div className="row">
               <div className="col-2">Antall regler sjekket:</div>
               <div className="col-10">{rulesCheckedCount}</div>
            </div>
            <div className="row">
               <div className="col-2">Antall regler totalt:</div>
               <div className="col-10">{result.rules.length}</div>
            </div>
            <div className="row">
               <div className="col-2">Tidsbruk:</div>
               <div className="col-10">{timeUsed} sek.</div>
            </div>
         </div>

         <ResponseBlock list={rulesWithMessages} title="Regler med feil eller advarsler" expandable={false} maxHeight={false} />
         <ResponseBlock list={passedRules} title="Validerte regler" />
         <ResponseBlock list={skippedRules} title="Regler som ikke er sjekket" />
         <JsonPrint data={result} title="Svar fra API" />
      </React.Fragment>
   );
}

function groupValidationResultByFileName(validationResult) {
   const groupedValidationResult = [];

   for (let i = 0; i < validationResult.files.length; i++) {
      const fileName = validationResult.files[i];
      const rules = [];

      for (let j = 0; j < validationResult.rules.length; j++) {
         const rule = { ...validationResult.rules[j] };
         const messages = rule.messages.filter(message => message.fileName === fileName);

         if (messages.length) {
            rule.messages = messages;
            rules.push(rule);
         }
      }

      groupedValidationResult.push({ fileName, rules });
   }

   return groupedValidationResult;
}


export default Response