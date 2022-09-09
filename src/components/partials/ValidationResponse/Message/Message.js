import React, { useState } from 'react';
import { Button } from 'react-bootstrap';

function Message({ message }) {
   const [expanded, setExpanded] = useState(false);
   const showDetails = message.gmlIds?.length || message.xPaths?.length || message.jsonPath;

   return (
      !showDetails ?
         message.message :
         <React.Fragment>
            <Button variant="link" onClick={() => setExpanded(!expanded)}>{message.message}</Button>

            <div className={`message-info ${expanded ? 'message-info-expanded' : ''}`}>
               {
                  message.xPaths?.length ?
                     <div className="row">
                        <div className="col-1">XPath:</div>
                        <div className="col-11">{message.xPaths.join(', ')}</div>
                     </div> :
                     null
               }
               {
                  message.gmlIds?.length ?
                     <div className="row">
                        <div className="col-1">GML-ID:</div>
                        <div className="col-11">{message.gmlIds.join(', ')}</div>
                     </div> :
                     null
               }
               {
                  message.jsonPath ?
                     <div className="row">
                        <div className="col-1">JSONPath:</div>
                        <div className="col-11">{message.jsonPath}</div>
                     </div> :
                     null
               }                                             
               <div className="row">
                  <div className="col-1">Filnavn:</div>
                  <div className="col-11">{message.fileName}</div>
               </div>
            </div>
         </React.Fragment>
   );
}

export default Message;