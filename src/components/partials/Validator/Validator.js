import { FileSelector, RuleSelector, Validation, WizardHeader } from 'components/partials'
import { useEffect, useState } from 'react';
import { HubConnectionBuilder } from '@microsoft/signalr';
import { Wizard } from 'react-use-wizard';
import ValidationContext from 'context/ValidationContext';
import { useApi } from 'hooks';
import './Validator.scss';

const SIGNAL_R_HUB_URL = process.env.REACT_APP_SIGNAL_R_HUB_URL;
const GML_APPLICATION_SCHEMA_API_URL = process.env.REACT_APP_GML_APPLICATION_SCHEMA_API_URL;
const SCHEMA_API_TASK_ID = 'gml-application-schema';

function Validator() {
   const [files, setFiles] = useState([]);
   const [schemas, setSchemas] = useState([]);
   const [schemaRegistryOptions, setSchemaRegistryOptions] = useState([]);
   const [schemaUri, setSchemaUri] = useState(null);
   const [rulesets, setRulesets] = useState([]);
   const [skippedRules, setSkippedRules] = useState([]);
   const [connection, setConnection] = useState(null);
   const [connectionId, setConnectionId] = useState(null);
   const [notification, setNotification] = useState(null);
   const { get } = useApi();

   useEffect(
      () => {
         async function fetchApplicationSchemas() {
            const response = await get(SCHEMA_API_TASK_ID, GML_APPLICATION_SCHEMA_API_URL);
            setSchemaRegistryOptions(response);
         }

         fetchApplicationSchemas();
      },
      [get]
   );

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
            schemaRegistryOptions,
            schemaUri,
            setSchemaUri,
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