import React from 'react';
import ResponseBlock from '../ResponseBlock/ResponseBlock';
import ValidatedFile from '../ValidatedFile/ValidatedFile';
import { JsonPrint } from 'components/custom-elements';
import './Response.scss';

function Response({ data }) {
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
                  <div className="dataset">
                     {                        
                        data.files.map((file, index) => {
                           return <ValidatedFile key={'file-' + index} file={file} rules={groupedValidationResult[file.fileName]} />
                        })
                     }
                  </div>
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


export default Response