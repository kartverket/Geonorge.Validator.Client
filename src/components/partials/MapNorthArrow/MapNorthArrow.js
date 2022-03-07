import NorthArrow from 'assets/gfx/symbol-north-arrow.svg';
import { useEffect, useState } from 'react';

function MapNorthArrow({ map }) {
   const [rotation, setRotation] = useState(0);

   useEffect(
      () => {
         const view = map?.getView();

         if (!view) {
            return;
         }

         view.on('change:rotation', event => {
            const rotation = event.target.getRotation();
            setRotation(rotation);
         });
      },
      [map]
   );

   return (
      <div className="north-arrow">
         <span>N</span>
         <img src={NorthArrow} style={{ transform: `rotate(${rotation}rad)` }} alt="" />
      </div>
   );
}

export default MapNorthArrow;