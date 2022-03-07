import React from 'react';
import Response from './Response/Response';

function ValidationReponse({ apiResponse }) {
   if (!apiResponse) {
      return null;
   }

   return (
      <React.Fragment>
         <h3>Resultat</h3>
         <Response data={apiResponse} />
      </React.Fragment>
   );
}

export default ValidationReponse;