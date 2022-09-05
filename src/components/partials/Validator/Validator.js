import { FileSelector, RuleSelector, Validation, WizardHeader } from 'components/partials'
import { useEffect, useState } from 'react';
import { HubConnectionBuilder } from '@microsoft/signalr';
import { Wizard } from 'react-use-wizard';
import ValidationContext from 'context/ValidationContext';
import './Validator.scss';

const SIGNAL_R_HUB_URL = process.env.REACT_APP_SIGNAL_R_HUB_URL;

function Validator() {
   const [files, setFiles] = useState([]);
   const [schemas, setSchemas] = useState([]);
   const [rulesets, setRulesets] = useState([]);
   const [skippedRules, setSkippedRules] = useState([]);
   const [connection, setConnection] = useState(null);
   const [connectionId, setConnectionId] = useState(null);
   const [notification, setNotification] = useState(null);

   useEffect(
      () => {
         const newConnection = new HubConnectionBuilder()
            .withUrl(SIGNAL_R_HUB_URL)
            .withAutomaticReconnect({
               nextRetryDelayInMilliseconds: _ => 5000
            })
            .build();

         newConnection.onreconnected(connectionId => setConnectionId(connectionId));

         setConnection(newConnection);
      },
      []
   );

   useEffect(
      () => {
         if (!connection) {
            return;
         }

         async function connect() {
            try {
               await connection.start();
               setConnectionId(connection.connectionId);
               connection.on('ReceiveMessage', message => setNotification(message));
            } catch (error) {
               console.log('Tilkobling mislyktes: ', error);
            }
         }

         connect();
      },
      [connection]
   );

   return (
      <div className="validator">
         <ValidationContext.Provider value={{
            files,
            setFiles,
            schemas,
            setSchemas,
            rulesets,
            setRulesets,
            skippedRules,
            setSkippedRules,
            connectionId,
            notification,
            setNotification
         }}>
            <Wizard header={<WizardHeader />}>
               <FileSelector />
               <RuleSelector />
               <Validation />
            </Wizard>
         </ValidationContext.Provider>
      </div>
   );
}

export default Validator;