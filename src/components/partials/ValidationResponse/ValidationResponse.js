import Response from './Response/Response';
import { JsonPrint } from 'components/custom-elements';
import React from 'react';

function ValidationReponse({ apiResponse }) {
   if (!apiResponse) {
      return null;
   }

   return (
      <React.Fragment>
         <div className="section">
            <div className="paper">
               <h4>Resultat</h4>
               <Response data={apiResponse} />
            </div>
         </div>
         <div className="section">
            <div className="paper">
               <h4>Svar fra API</h4>
               <JsonPrint data={apiResponse} />
            </div>
         </div>
      </React.Fragment>
   );
}

export default ValidationReponse;