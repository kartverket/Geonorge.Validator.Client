import React, { useEffect, useState } from 'react';
import { Dialog, SelectDropdown } from './components/custom-elements';
import { RuleInfo, Validate, ValidationReponse } from 'components/partials';
import { sendAsync } from 'utils/api';
import Logo from 'assets/gfx/logo-geonorge.svg';
import './App.scss';

const VALIDATOR_INFO_URL = process.env.REACT_APP_VALIDATOR_INFO_URL;

function App() {
   const [validators, setValidators] = useState([]);
   const [validatorOptions, setValidatorOptions] = useState([]);
   const [selectedValidator, setSelectedValidator] = useState(null);
   const [apiResponse, setApiResponse] = useState(null);

   useEffect(() => {
      sendAsync(VALIDATOR_INFO_URL, null, { method: 'GET' })
         .then(data => {
            const options = data.map(validator => {
               return { value: validator.namespace, label: validator.name };
            });

            setValidatorOptions(options);
            setValidators(data);
         });
   }, []);

   function handleApiResponse(response) {
      setApiResponse(response);
   }

   function handleSelect(option) {
      const validator = validators.find(validator => validator.namespace === option.value);
      setSelectedValidator(validator);
   }

   if (!validatorOptions.length) {
      return null;
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
               <div className="select-validator">
                  <SelectDropdown
                     className="selectDropdown"
                     options={validatorOptions}
                     placeholder="Velg validator..."
                     onSelect={handleSelect}
                  />

                  <RuleInfo validator={selectedValidator} />
               </div>

               <Validate validator={selectedValidator} onApiResponse={handleApiResponse} />
            </div>

            {
               apiResponse !== null ?
                  <div className="section">
                     <ValidationReponse apiResponse={apiResponse} />
                  </div> :
                  null
            }

         </div>

         <Dialog />
      </div>
   );
}

export default App;
