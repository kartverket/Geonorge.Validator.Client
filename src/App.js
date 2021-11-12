import React, { useState } from 'react';
import { Dialog } from './components/custom-elements';
import { Validate, ValidationReponse } from 'components/partials';
import Logo from 'assets/gfx/logo-geonorge.svg';
import './App.scss';

function App() {
   const [apiResponse, setApiResponse] = useState(null);

   function handleApiResponse(response) {
      setApiResponse(response);
   }

   return (
      <div className="app">
         <div className="container">
            <header>
               <h1>
                  <img src={Logo} alt="Geonorge" />
                  <span>Validator</span>
               </h1>
            </header>

            <div className="section">
               <Validate onApiResponse={handleApiResponse} />
            </div>

            {
               apiResponse !== null ?
                  <ValidationReponse apiResponse={apiResponse} /> :
                  null
            }
         </div>

         <Dialog />
      </div>
   );
}

export default App;
