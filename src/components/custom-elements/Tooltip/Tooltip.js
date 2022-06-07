import React, { useRef, useState } from 'react';
import { Overlay } from 'react-bootstrap';

const defaultStyle = {
   backgroundColor: 'rgb(247 247 247)',
   border: '1px solid #dee2e6',
   boxShadow: '2px 2px 5px 0px #efefef',
   padding: '2px 10px',
   color: '#333333',
   fontSize: '12px',
   borderRadius: 3,
   position: 'absolute'
};

function Tooltip({ trigger, tooltip, style }) {
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

   const styling = {...defaultStyle, ...(style || {})}

   return (
      <React.Fragment>
         {clonedTrigger}

         <Overlay target={target.current} show={show} placement="top" transition={false}>
            {               
               ({ placement, arrowProps, show: _show, popper, ...props }) => (
                  <div {...props} style={{ ...styling, ...props.style }}>
                     {tooltip}
                  </div>
               )
            }
         </Overlay>
      </React.Fragment>
   )
}

export default Tooltip