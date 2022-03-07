import { Validate, ValidationReponse } from 'components/partials'
import { useState } from 'react';

function Validator({ onApiResponse }) {
   const [apiResponse, setApiResponse] = useState(null);
   
   function handleApiResponse(response) {
      setApiResponse(response);
      onApiResponse(response);
   }

   return (
      <div className="validator">
         <div>
            <Validate onApiResponse={handleApiResponse} />
         </div>
         {
            apiResponse !== null ?
               <div>
                  <ValidationReponse apiResponse={apiResponse} />
               </div> :
               null
         }
      </div>
   )
}

export default Validator;