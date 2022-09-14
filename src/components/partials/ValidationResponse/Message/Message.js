import React, { useState } from 'react';
import { Button } from 'react-bootstrap';

function Message({ message }) {
   const [expanded, setExpanded] = useState(false);
   const showDetails = message.gmlIds?.length || message.xPaths?.length || message.jsonPath || message.lineNumber || message.linePosition;

   return (
      !showDetails ?
         message.message :
         <React.Fragment>
            <Button variant="link" onClick={() => setExpanded(!expanded)}>{message.message}</Button>

            <div className={`message-info ${expanded ? 'message-info--expanded' : ''}`}>
               {
                  message.xPaths?.length ?
                     <div className="message-info__row">
                        <div className="message-info__row__label">XPath:</div>
                        <div className="message-info__row__value">{message.xPaths.join(', ')}</div>
                     </div> :
                     null
               }
               {
                  message.gmlIds?.length ?
                     <div className="message-info__row">
                        <div className="message-info__row__label">GML-ID:</div>
                        <div className="message-info__row__value">{message.gmlIds.join(', ')}</div>
                     </div> :
                     null
               }
               {
                  message.jsonPath ?
                     <div className="message-info__row">
                        <div className="message-info__row__label">JSONPath:</div>
                        <div className="message-info__row__value">{message.jsonPath}</div>
                     </div> :
                     null
               }
               {
                  message.lineNumber ?
                     <div className="message-info__row">
                        <div className="message-info__row__label">Linje:</div>
                        <div className="message-info__row__value">{message.lineNumber}</div>
                     </div> :
                     null
               }
               {
                  message.linePosition ?
                     <div className="message-info__row">
                        <div className="message-info__row__label">Posisjon:</div>
                        <div className="message-info__row__value">{message.linePosition}</div>
                     </div> :
                     null
               }
               <div className="message-info__row">
                  <div className="message-info__row__label">Filnavn:</div>
                  <div className="message-info__row__value">{message.fileName}</div>
               </div>
            </div>
         </React.Fragment>
   );
}

export default Message;