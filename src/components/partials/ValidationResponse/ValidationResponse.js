import React from 'react';
import Response from './Response/Response';

function ValidationReponse({ apiResponse }) {
   if (!apiResponse) {
      return null;
   }

   return (
      <React.Fragment>
         <div className="section">
            <div>
               <h3>Resultat</h3>
               <Response data={apiResponse} />
            </div>
         </div>
      </React.Fragment>
   );
}

export default ValidationReponse;