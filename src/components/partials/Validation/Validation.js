import { Fragment, useContext, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useApi } from 'hooks';
import { Button, ProgressBar } from 'react-bootstrap';
import { validateFilesForMapView } from 'utils/file-validator';
import { ValidationContext } from 'context';
import { ValidationResponse } from 'components/partials';
import { useWizard } from 'react-use-wizard';
import './Validation.scss';

const VALIDATE_API_URL = process.env.REACT_APP_VALIDATE_API_URL;
const API_TASK_ID = 'validation';

function Validate() {
   const { files, setFiles, schemas, setSchemas, setRulesets, skippedRules, setSkippedRules, notification, setNotification, connectionId } = useContext(ValidationContext);
   const [apiResponse, setApiResponse] = useState(null);
   const uploadProgress = useSelector(state => state.progress.uploadProgress);
   const { goToStep } = useWizard();
   const { post } = useApi();

   useEffect(
      () => {
         async function validate() {
            const formData = new FormData();

            files.forEach(file => formData.append('files', file));
            schemas.forEach(file => formData.append('schema', file));

            if (skippedRules.length) {
               formData.append('skipRules', skippedRules.join(', '));
            }

            setNotification('Laster opp');

            const headers = { 'Content-Type': 'multipart/form-data', 'SignalR-ConnectionId': connectionId };
            const response = await post(API_TASK_ID, VALIDATE_API_URL, formData, { headers });

            if (response) {
               setApiResponse({
                  validationResult: response,
                  files: await validateFilesForMapView(files)
               });
            }
         }

         if (files.length) {
            validate();
         }
      },
      [files, schemas, skippedRules, connectionId, setNotification, post]
   );

   function goToFirstStep() {
      setFiles([]);
      setSchemas([]);
      setRulesets([]);
      setSkippedRules([]);
      setNotification(null);
      goToStep(0);
   }

   return (
      <Fragment>
         <div className="validation">
            {
               apiResponse === null ?
                  <div className="progresss">
                     <ProgressBar now={uploadProgress.completed} animated={true} />
                     <span className="loading">{notification}</span>
                  </div> :
                  null
            }
            {
               apiResponse !== null ?
                  <ValidationResponse apiResponse={apiResponse} /> :
                  null
            }
         </div>

         <div className="wizard-footer">
            <div className="wizard-footer__buttons">
               <Button variant="primary" className="button__finish" onClick={() => goToFirstStep()} disabled={apiResponse === null}>Ferdig</Button>
            </div>
         </div>
      </Fragment>
   );
}

export default Validate;