import { Button } from 'react-bootstrap';
import { Spinner, Tooltip } from 'components/custom-elements';
import { useApi } from 'hooks';
import { useSelector } from 'react-redux';
import { useContext, useEffect, useState } from 'react';
import MapViewContext from 'context/MapViewContext';
import { useDispatch } from 'react-redux';
import { createId } from 'utils/map/helpers';
import { setActiveTab } from 'store/slices/tabSlice';
import './ValidatedFile.scss';
import { toggleMapLoading } from 'store/slices/apiSlice';

const MAP_DOCUMENT_API_URL = process.env.REACT_APP_MAP_DOCUMENT_API_URL;

function ValidatedFile({ file, rules }) {
   const [mapViews, setMapViews] = useContext(MapViewContext);
   const [thisMapLoading, setThisMapLoading] = useState(false);
   const apiTasks = useSelector(state => state.api.tasks);
   const mapLoading = useSelector(state => state.api.mapLoading);
   const sendAsync = useApi();
   const dispatch = useDispatch();
   
   useEffect(
      () => {
         setThisMapLoading(apiTasks.includes(file.fileName));
      },
      [apiTasks, file.fileName]
   );

   async function showInMap(file) {
      let index = mapViews.findIndex(mapView => mapView.mapDocument.fileName === file.name);

      if (index === -1) {
         const mapDocument = await fetchMapDocument(file);

         if (mapDocument !== null) {
            setMapViews([...mapViews, { mapId: createId(), mapDocument }]);
         }
      } else {
         const mapId = mapViews[index].mapId;
         dispatch(setActiveTab({ activeTab: mapId }));
      }
   }

   async function fetchMapDocument(file) {
      dispatch(toggleMapLoading({ mapLoading: true }));
      const formData = new FormData();

      formData.append('gmlFile', file);
      formData.append('validate', false);

      const mapDocument = await sendAsync(file.name, MAP_DOCUMENT_API_URL, formData, { headers: { 'Content-Type': 'multipart/form-data' } }, false);

      if (mapDocument === null) {
         dispatch(toggleMapLoading({ mapLoading: false }));
         return null;
      }

      mapDocument.validationResult.rules = rules || [];

      return mapDocument;
   }

   return (
      !file.messages.length ?
         <div className="file">
            {file.fileName}<Button variant="link" onClick={() => showInMap(file.blob)} disabled={mapLoading}>Vis i kart</Button>
            {
               thisMapLoading ?
                  <Spinner /> :
                  null
            }
         </div> :
         <div className="file file-no-map">
            {file.fileName}

            <Tooltip
               tooltip={
                  <ul className="file-messages">
                     {file.messages.map((message, index) => <li key={`${file.fileName}-message-${index}`}>{message}</li>)}
                  </ul>
               }
               trigger={
                  <span>(Vis i kart)</span>
               }
            >
            </Tooltip>
         </div>
   );
}

export default ValidatedFile