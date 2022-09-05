import React from 'react';
import ValidatedFile from './ValidatedFile/ValidatedFile';
import { JsonPrint } from 'components/custom-elements';
import { Tab, Tabs } from 'react-bootstrap';
import ResponseRow from './ResponseRow/ResponseRow';
import './ValidationResponse.scss';

function ValidationResponse({ apiResponse }) {
   if (!apiResponse) {
      return null;
   }

   const result = apiResponse.validationResult;
   const rulesWithMessages = result.rules.filter(rule => rule.messages.length > 0);
   const passedRules = result.rules.filter(rule => rule.status === 'PASSED');
   const skippedRules = result.rules.filter(rule => rule.status === 'SKIPPED');
   const rulesCheckedCount = rulesWithMessages.length + passedRules.length;
   const timeUsed = result.timeUsed.toString().replace('.', ',');
   const groupedValidationResult = groupValidationResultByFileName(result);

   return (
      <div className="response-container">
         <div className="row mb-2">
            <div className="col">
               {
                  result.errors === 0 ?
                     <b className="passed">Datasettet validerer i henhold til gjeldende valideringsregler</b> :
                     <b className="failed">Datasettet validerer ikke i henhold til gjeldende valideringsregler</b>
               }
            </div>
         </div>
         <div className="summary">
            <div className="row">
               <div className="col-2">Datasett:</div>
               <div className="col-10">
                  <div className="dataset">
                     {
                        apiResponse.files.map((file, index) => {
                           return <ValidatedFile key={'file-' + index} file={file} rules={groupedValidationResult[file.fileName]} />
                        })
                     }
                  </div>
               </div>
            </div>
            <div className="row">
               <div className="col-2">Navneområde:</div>
               <div className="col-10">{result.namespace}</div>
            </div>
            <div className="row">
               <div className="col-2">Feil:</div>
               <div className="col-10">{result.errors}</div>
            </div>
            <div className="row">
               <div className="col-2">Advarsler:</div>
               <div className="col-10">{result.warnings}</div>
            </div>
            <div className="row">
               <div className="col-2">Regler sjekket:</div>
               <div className="col-10">{rulesCheckedCount} av {result.rules.length} totalt</div>
            </div>
            <div className="row">
               <div className="col-2">Tidsbruk:</div>
               <div className="col-10">{timeUsed} sek.</div>
            </div>
         </div>

         <Tabs transition={false}>
            {
               rulesWithMessages.length ?
                  <Tab eventKey="failed-rules" title={`Regler som gir feil eller advarsler (${rulesWithMessages.length})`}>
                     {rulesWithMessages.map((element, index) => <ResponseRow key={'failed-rules-' + index} data={element} />)}
                  </Tab> :
                  null
            }
            {
               passedRules.length ?
                  <Tab eventKey="passed-rules" title={`Regler som passerer valideringen uten feil eller advarsler (${passedRules.length})`}>
                     {passedRules.map((element, index) => <ResponseRow key={'passed-rules-' + index} data={element} />)}
                  </Tab> :
                  null
            }
            {
               skippedRules.length ?
                  <Tab eventKey="skipped-rules" title={`Regler som ikke er sjekket (${skippedRules.length})`}>
                     {skippedRules.map((element, index) => <ResponseRow key={'skipped-rules-' + index} data={element} />)}
                  </Tab> :
                  null
            }
            <Tab eventKey="json-response" title="Svar fra API">
               <JsonPrint data={result} />
            </Tab>
         </Tabs>
      </div>
   );
}

function groupValidationResultByFileName(validationResult) {
   const groupedValidationResult = {};

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

      groupedValidationResult[fileName] = rules;
   }

   return groupedValidationResult;
}

export default ValidationResponse;