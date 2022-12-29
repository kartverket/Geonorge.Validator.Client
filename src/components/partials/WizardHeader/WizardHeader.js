import { useWizard } from 'react-use-wizard';
import './WizardHeader.scss';

const WIZARD_STEPS = [
   'Datasett',
   'Regler',
   'Validering'
];

function WizardHeader() {
   const { activeStep } = useWizard();

   return (
      <div className="wizard-header">
         <div className="steps">
            {
               WIZARD_STEPS.map((step, index) => {
                  return (
                     <div key={'step-' + index} className={`step ${activeStep === index ? 'active' : ''}`} role="region" aria-label={step}>
                        <span className="step-number">{index + 1}</span>
                        <span>{step}</span>
                     </div>
                  )
               })
            }
         </div>
      </div>
   );
}

export default WizardHeader;