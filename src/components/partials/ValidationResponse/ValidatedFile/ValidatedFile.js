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

const MAP_DOCUMENT_API_URL = process.env.REACT_APP_MAP_DOCUMENT_API_URL;

function ValidatedFile({ file, rules }) {
   console.log('validatedFile');
   const [mapViews, setMapViews] = useContext(MapViewContext);
   const [mapLoading, setMapLoading] = useState(false);
   const apiTasks = useSelector(state => state.api.tasks);
   const sendAsync = useApi();
   const dispatch = useDispatch();
   
   useEffect(
      () => {
         setMapLoading(apiTasks.includes(file.fileName));
      },
      [apiTasks, file.fileName]
   );

   async function showInMap(file) {
      let index = mapViews.findIndex(mapView => mapView.mapDocument.fileName === file.name);

      if (index === -1) {
         setMapViews([...mapViews, { mapId: createId(), mapDocument: await fetchMapDocument(file) }]);
      } else {
         const mapId = mapViews[index].mapId;
         dispatch(setActiveTab({ activeTab: mapId }));
      }
   }

   async function fetchMapDocument(file) {
      const formData = new FormData();

      formData.append('gmlFile', file);
      formData.append('validate', false);

      const mapDocument = await sendAsync(file.name, MAP_DOCUMENT_API_URL, formData, { headers: { 'Content-Type': 'multipart/form-data' } }, false);
      mapDocument.validationResult.rules = rules || [];

      return mapDocument;
   }

   return (
      !file.messages.length ?
         <div className="file">
            {file.fileName}<Button variant="link" onClick={() => showInMap(file.blob)}>Vis i kart</Button>
            {
               mapLoading ?
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