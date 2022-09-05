import { Fragment, useContext, useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useApi } from 'hooks';
import { useWizard } from 'react-use-wizard';
import { ValidationContext } from 'context';
import CheckboxTree from 'react-checkbox-tree';
import './RuleSelector.scss';

const RULESETS_API_URL = process.env.REACT_APP_RULESETS_API_URL;
const API_TASK_ID = 'rule-selector';

function RuleSelector() {
   const [checked, setChecked] = useState([]);
   const [expanded, setExpanded] = useState([]);
   const [ruleIds, setRuleIds] = useState([]);
   const [rulesets, setRulesets] = useState([]);
   const { files, schemas, setSkippedRules } = useContext(ValidationContext);
   const { previousStep, nextStep } = useWizard();
   const { post } = useApi();

   useEffect(
      () => {
         async function fetchRuleSets() {
            const formData = new FormData();

            await addFileSlicesToFormData(files, 'files', formData);
            await addFileSlicesToFormData(schemas, 'schema', formData);

            const headers = { 'Content-Type': 'multipart/form-data' }
            const response = await post(API_TASK_ID, RULESETS_API_URL, formData, { headers });

            if (response) {
               setRulesets(response);
            }
         }

         fetchRuleSets();
      },
      [post, files, schemas]
   );

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

   async function addFileSlicesToFormData(files, name, formData) {
      for (let i = 0; i < files.length; i++) {
         const file = files[i];
         const sliced = await file.slice(0, 50000);
         formData.append(name, sliced);
      }
   }

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
               <Button variant="primary" className="button__next" onClick={() => nextStep()}>Validér</Button>
            </div>
         </div>
      </Fragment>
   );
}

export default RuleSelector;