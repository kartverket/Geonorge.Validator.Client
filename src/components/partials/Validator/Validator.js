import { Validate, ValidationReponse } from 'components/partials'
import { useState } from 'react';
import './Validator.scss';

function Validator({ onApiResponse }) {
   const [apiResponse, setApiResponse] = useState(null);
   
   function handleApiResponse(response) {
      setApiResponse(response);
      onApiResponse(response);
   }

   return (
      <div className="validator">
         <div className="introtext">
            <h1 className="hidden">GML-validator</h1>

            <h2>Formål</h2>
            <p>
               GML er for det foretrukne formatet for å distribuere modellriktige geodata i Norge. 
               For å sørge for at GML-filer leveres i henhold til spesifikasjonen, blir denne validatoren utviklet.
               </p>
            
            <h2>Under utvikling</h2>
            <p>
               Løsningen er under utvikling og er ikke feilfri. Om en fil validerer i løsningen, så kan den likevel ha «feil» som ikke testes. 
               Vi er takknemlig for alle typer tilbakemeldinger. Nye og forbedrede tester vil komme til.
            </p>
            
            <h2>Begrensninger</h2>
            <p>
               Løsningen er åpen for alle. Det er begrensninger i størrelse på GML-filer som kan valideres og vises i kartet. 
               Vi ønsker å skalere opp til å kunne validere større filer, men inntil videre er grensen 1 GB for validering og 100 MB for kartvisning.
            </p>
            
            <h2>Om løsningen</h2>
            <p>
               Løsningen er en videreutvikling av Reguleringsplan-validatoren som DiBK har fått utviklet. Løsningen er tilgjengelig gjennom webgrensesnitt og som API.&nbsp;
               <a href="https://github.com/kartverket/Geonorge.Validator" target="_blank" rel="noreferrer">Kildekoden er tilgjengelig gjennom GitHub</a>, 
               og det anbefales at større brukere implementerer koden i egne løsninger sammen med produksjonsmiljøet, slik at en eventuelt også kan rette feil som blir avdekket gjennom valideringsprosessen.&nbsp;
               <a href="https://github.com/Arkitektum/DiBK.RuleValidator" target="_blank" rel="noreferrer">Kode for validatoren finner du også på GitHub</a>.
            </p>
         </div>
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