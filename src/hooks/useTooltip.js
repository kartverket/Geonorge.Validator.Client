import React, { useRef, useState } from 'react';
import { Button, Overlay } from 'react-bootstrap';

export default function Tooltip({ tooltip, trigger }) {
   const [show, setShow] = useState(false);
   const target = useRef(null);
   let cloned;

   if (React.isValidElement(trigger)) {
      cloned = React.cloneElement(trigger, { 
         ref: target,
         onMouseEnter: () => setShow(true),
         onMouseLeave: () => setShow(false)
      });
   }

  /* const childrenWithProps = React.Children.map(children, child => {
      // Checking isValidElement is the safe way and avoids a typescript
      // error too.
      if (React.isValidElement(child)) {
        return React.cloneElement(child, { doSomething });
      }
      return child;
    });*/

   return (
      <React.Fragment>

         {cloned}
         
         <Overlay target={target.current} show={show} placement="top" transition={false}>
            {({ placement, arrowProps, show: _show, popper, ...props }) => (
               <div
                  {...props}
                  style={{
                     backgroundColor: 'rgba(0, 0, 0, 0.85)',
                     padding: '2px 10px',
                     color: 'white',
                     borderRadius: 3,
                     ...props.style,
                  }}
               >
                  {tooltip}
               </div>
            )}
         </Overlay>
      </React.Fragment>
   )
}