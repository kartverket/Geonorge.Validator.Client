import { Fragment, useContext, useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useWizard } from 'react-use-wizard';
import { ValidationContext } from 'context';
import CheckboxTree from 'react-checkbox-tree';
import './RuleSelector.scss';

function RuleSelector() {
   const [checked, setChecked] = useState([]);
   const [expanded, setExpanded] = useState([]);
   const [ruleIds, setRuleIds] = useState([]);
   const { rulesets, setSkippedRules } = useContext(ValidationContext);
   const { previousStep, nextStep } = useWizard();

   useEffect(
      () => {
         if (checked.length) {
            const skippedRules = ruleIds.filter(ruleId => !checked.some(id => ruleId === id));
            setSkippedRules(skippedRules);
         }
      },
      [ruleIds, checked, setSkippedRules]
   );

   useEffect(
      () => {
         const ids = rulesets
            .flatMap(ruleset => ruleset.groups)
            .flatMap(group => group.rules)
            .map(rule => rule.id);

         setRuleIds(ids);
         setChecked(ids);
      },
      [rulesets]
   );

   const nodes = rulesets
      .map(ruleset => {
         return {
            value: ruleset.name,
            label: ruleset.name,
            disabled: ruleset.mandatory,
            children: ruleset.groups
               .flatMap(group => group.rules)
               .map(rule => {
                  return {
                     value: rule.id,
                     label: `${rule.name}\u00A0\u00A0(${rule.id})`
                  };
               })
         }
      });

   return (
      <Fragment>
         <div className="rule-selector">
            {
               rulesets.length ?
                  <CheckboxTree
                     nodes={nodes}
                     checked={checked}
                     expanded={expanded}
                     onCheck={setChecked}
                     onExpand={setExpanded}
                  /> :
                  null
            }
         </div>

         <div className="wizard-footer">
            <div className="wizard-footer__buttons">
               <Button variant="primary" className="button__prev" onClick={() => previousStep()}>Forrige</Button>
               <Button variant="primary" className="button__next" onClick={() => nextStep()} disabled={!rulesets.length}>Validér</Button>
            </div>
         </div>
      </Fragment>
   );
}

export default RuleSelector;