import { useState } from 'react';

function Ruleset({ ruleset, id }) {
   const [expanded, setExpanded] = useState(false);
   const ruleCount = ruleset.groups.flatMap(group => group.rules).length;

   function renderGroup(group, id) {
      return (
         <div className="rule-group" key={'rule-group-' + id}>
            {
               group.name ?
                  <h4>{group.name} ({group.rules.length})</h4> :
                  null
            }
            <div className="rules">
               {group.rules.map(rule => renderRule(rule))}
            </div>
         </div>
      );
   }

   function renderRule(rule) {
      return (
         <div key={rule.id} className="rule">
            <div className="type">
               <span className={`label label-${rule.messageType.toLowerCase()}`}>{rule.messageType}</span>
            </div>
            <div className="name">
               <div>
                  <span>{rule.name}</span>
                  {rule.documentation ? <a className="documentation" href={rule.documentation} target="_blank" rel="noreferrer">(Dokumentasjon)</a> : ''}
               </div>
               {rule.description ? <span className="description">{rule.description}</span> : ''}
            </div>
            <div className="id">{rule.id}</div>
         </div>
      );
   }

   return (
      <div className="ruleset">         
         <div className="ruleset-groups">
            {ruleset.groups.map((group, idx) => renderGroup(group, `${id}-${idx}`))}
         </div>
      </div>
   );
}

export default Ruleset;