import Ruleset from './Ruleset';
import { createSafeString } from 'utils/map/helpers';
import { useApi } from 'hooks';
import { useEffect, useState } from 'react';
import './Rulesets.scss';
import { Tab, Tabs } from 'react-bootstrap';

const RULESETS_API_URL = process.env.REACT_APP_RULESETS_API_URL;
const API_TASK_ID = 'rulesets';

function Rulesets() {
   const [rulesets, setRulesets] = useState([]);
   const { get } = useApi();

   useEffect(
      () => {
         async function fetchRulesets() {
            const response = await get(API_TASK_ID, RULESETS_API_URL);

            if (response !== null) {
               setRulesets(response);
            }
         }

         fetchRulesets();
      },
      [get]
   );

   return (
      rulesets ?
         <div className="rulesets">
            <h2>Regler</h2>

            <div className="rulesets-tabs">
               <Tabs transition={false}>
                  {
                     rulesets.map(ruleset => {
                        const id = createSafeString(ruleset.name);

                        return (
                           <Tab title={ruleset.name} key={id} eventKey={id}>
                              <Ruleset ruleset={ruleset} id={id} />
                           </Tab>
                        )
                     })
                  }
               </Tabs>
            </div>

         </div> :
         null
   );
}

export default Rulesets;