import { useState } from 'react';
import Message from '../Message/Message';
import './Messages.scss';

function Messages({ messages, fileName }) {
   const [expanded, setExpanded] = useState(true);

   return (
      <div className="messages">
         {
            fileName ?
               <div className={`expand-link ${expanded ? 'expand-link--expanded' : ''}`} role="button" onClick={() => setExpanded(!expanded)}>{fileName} ({messages.length})</div> :
               null
         }
         <ol>
            {
               messages.map((message, index) => {
                  return (
                     <li key={index}>
                        <Message message={message} />
                     </li>
                  );
               })
            }
         </ol>
      </div>
   );
}

export default Messages;