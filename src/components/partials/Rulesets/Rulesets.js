import useApiGet from 'hooks/useApiGet';
import Ruleset from './Ruleset';
import { createSafeString } from 'utils/map/helpers';
import './Rulesets.scss';

const RULESETS_API_URL = process.env.REACT_APP_RULESETS_API_URL;

function Rulesets() {
   const { data: rulesets } = useApiGet(RULESETS_API_URL);

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