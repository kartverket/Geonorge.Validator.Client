import React, { useRef, useState } from 'react';
import { Overlay } from 'react-bootstrap';

const defaultStyle = {
   backgroundColor: 'rgba(0, 0, 0, 0.85)',
   padding: '2px 10px',
   color: 'white',
   borderRadius: 3
};

function Tooltip({ trigger, tooltip }) {
   const [show, setShow] = useState(false);
   const target = useRef(null);

   if (!React.isValidElement(trigger)) {
      return null;
   }

   const clonedTrigger = React.cloneElement(trigger, {
      ref: target,
      onMouseEnter: () => setShow(true),
      onMouseLeave: () => setShow(false)
   });

   return (
      <React.Fragment>
         {clonedTrigger}

         <Overlay target={target.current} show={show} placement="top" transition={false}>
            {
               ({ placement, arrowProps, show: _show, popper, ...props }) => (
                  <div {...props} style={{ ...defaultStyle, ...props.style }}>
                     {tooltip}
                  </div>
               )
            }
         </Overlay>
      </React.Fragment>
   )
}

export default Tooltip