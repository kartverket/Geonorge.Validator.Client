import { baseMap } from 'config/baseMap.config';
import { useCallback, useEffect, useRef, useState } from 'react';
import { getLayer } from 'utils/map/helpers';
import { getScaleForResolution } from 'utils/map/scale';
import './MapInfo.scss';

function MapInfo({ mapDocument, map }) {
   const prevResolution = useRef(0);
   const [scale, setScale] = useState(null);

   const getScale = useCallback(
      event => {
         const view = event.target.getView();
         const resolution = view.getResolution();

         if (resolution !== prevResolution.current) {
            setScale(getScaleForResolution(view));
            prevResolution.current = resolution;
         }
      },
      []
   );

   useEffect(
      () => {
         if (!map) {
            return;
         }

         map.on('moveend', getScale);

         return () => {
            map.un('moveend', getScale);
         };
      },
      [map, getScale]
   );

   function hasBaseMap() {
      if (!map) {
         return false;
      }

      return getLayer(map, 'baseMap') !== undefined;
   }

   if (!mapDocument || !map) {
      return null;
   }

   return (
      <div className="map-info box">
         <div className="box-header">Kartopplysninger</div>

         <div className="box-content">
            <div>
               {
                  hasBaseMap() ?
                     <div className="box-row">
                        <div className="label">Kilde for basiskart:</div>
                        <div className="value">{baseMap.name}</div>
                     </div> :
                     null
               }
               <div className="box-row">
                  <div className="label">Koordinatsystem:</div>
                  <div className="value" title={mapDocument.epsg.description}>{mapDocument.epsg.description}</div>
               </div>
            </div>
            <div>
               {
                  hasBaseMap() ?
                     <div className="box-row">
                        <div className="label">Ekvidistanse:</div>
                        <div className="value">{baseMap.equidistance} m</div>
                     </div> :
                     null
               }
               <div className="box-row">
                  <div className="label">Kartmålestokk:</div>
                  <div className="value">{scale}</div>
               </div>
            </div>
         </div>
      </div>
   );
}

export default MapInfo;