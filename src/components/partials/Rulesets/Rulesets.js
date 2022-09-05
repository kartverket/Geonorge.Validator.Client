import Ruleset from './Ruleset';
import { createSafeString } from 'utils/map/helpers';
import { useApi } from 'hooks';
import { useEffect, useState } from 'react';
import './Rulesets.scss';

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
            {
               rulesets.map(ruleset => {
                  const id = createSafeString(ruleset.name);

                  return <Ruleset key={id} ruleset={ruleset} id={id} />
               })
            }
         </div> :
         null
   );
}

export default Rulesets;