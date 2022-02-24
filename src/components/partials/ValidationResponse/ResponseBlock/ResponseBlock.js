import React from 'react';
import { useState } from 'react';
import ResponseRow from '../ResponseRow/ResponseRow';
import './ResponseBlock.scss';

function ResponseBlock({ title, list, expandable = true, maxHeight = true }) {
   const [expanded, setExpanded] = useState(false);

   if (!list.length) {
      return null;
   }

   function handleClick() {
      setExpanded(!expanded);
   }

   return (
      <div className={`response-block ${expandable ? 'response-block-expandable' : ''} ${!expanded && expandable ? 'response-block-collapsed' : ''}`}>
         <h3 {...(expandable && { onClick: handleClick })}>{title} ({list.length})</h3>
         <div className={`response ${maxHeight ? 'response-max-height' : ''}`}>
            {list.map((element, index) => <ResponseRow key={index} data={element} />)}
         </div>
      </div>
   );
};

export default ResponseBlock