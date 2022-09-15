import { useState } from 'react';
import { groupBy } from 'utils/map/helpers';
import Messages from '../Messages/Messages';
import './ResponseRow.scss';

const getStatus = (status) => status === 'NOT_EXECUTED' ? 'skipped' : status.toLowerCase();

function ResponseRow({ data }) {
   const [expanded, setExpanded] = useState(false);

   if (!data) {
      return null;
   }

   function handleClick(event) {
      if (event.target.nodeName !== "A") {
         setExpanded(!expanded);
      }
   }

   const hasMessages = data.messages.length > 0;
   const status = getStatus(data.status);
   const groupedMessages = groupBy(data.messages, message => message.fileName);
   const fileCount = Object.keys(groupedMessages).length;

   return (
      <div className={`response-row ${hasMessages ? 'response-row-with-messages' : ''}`}>
         <div className="info" {...(hasMessages && { onClick: handleClick })}>
            <div className="status">
               <span className={`label label-${status}`}>{status}</span>
            </div>
            <div className="name">
               <div>
                  <span>{data.name} {hasMessages ? `(${data.messages.length})` : ''}</span>
                  {data.documentation ? <a className="documentation" href={data.documentation} target="_blank" rel="noreferrer">(Dokumentasjon)</a> : ''}
               </div>
               {data.description ? <span className="description">{data.description}</span> : ''}
            </div>
            <div className="id">{data.id}</div>
         </div>
         {
            hasMessages ?
               (
                  <div className={`messages-container ${expanded ? 'messages-container--expanded' : ''}`}>
                     {
                        fileCount === 1 ?
                           <Messages messages={data.messages} /> :
                           Object.keys(groupedMessages).map(key => <Messages messages={groupedMessages[key]} fileName={key} key={key} />)
                     }
                  </div>
               ) :
               null
         }
      </div>
   );
};

export default ResponseRow