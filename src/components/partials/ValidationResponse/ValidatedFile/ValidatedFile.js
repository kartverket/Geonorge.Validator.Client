import { Button, ProgressBar } from 'react-bootstrap';
import { Tooltip } from 'components/custom-elements';
import { useApi } from 'hooks';
import { useSelector } from 'react-redux';
import { useContext, useEffect, useState } from 'react';
import MapViewContext from 'context/MapViewContext';
import { useDispatch } from 'react-redux';
import { createRandomId } from 'utils/map/helpers';
import { setActiveTab } from 'store/slices/tabSlice';
import { toggleMapLoading } from 'store/slices/progressSlice';
import './ValidatedFile.scss';

const MAP_DOCUMENT_API_URL = process.env.REACT_APP_MAP_DOCUMENT_API_URL;

function ValidatedFile({ file, rules }) {
   const [mapViews, setMapViews] = useContext(MapViewContext);
   const [showProgressBar, setShowProgressBar] = useState(false);
   const mapLoading = useSelector(state => state.progress.mapLoading);
   const uploadProgress = useSelector(state => state.progress.uploadProgress);
   const { post } = useApi();
   const dispatch = useDispatch();

   useEffect(
      () => {
         setShowProgressBar(uploadProgress.taskId === file.fileName);
      },
      [uploadProgress, file.fileName]
   );

   async function showInMap(file) {
      let index = mapViews.findIndex(mapView => mapView.mapDocument.fileName === file.name);

      if (index === -1) {
         const mapDocument = await fetchMapDocument(file);

         if (mapDocument !== null) {
            setMapViews([...mapViews, { mapId: createRandomId(), mapDocument }]);
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
      let mapDocument;

      try {
         mapDocument = await post(file.name, MAP_DOCUMENT_API_URL, formData, { headers: { 'Content-Type': 'multipart/form-data' } }, false);
      } catch (error) {
         dispatch(toggleMapLoading({ mapLoading: false }));         
         return null;   
      }
      
      if (mapDocument === null) {
         dispatch(toggleMapLoading({ mapLoading: false }));
         return null;
      }

      mapDocument.validationResult = { rules: rules || [] };

      return mapDocument;
   }

   return (
      !file.messages.length ?
         <div className="file">
            {file.fileName} ({file.size})<Button variant="link" onClick={() => showInMap(file.blob)} disabled={mapLoading}>Vis i kart</Button>

            <div className={`validating-progress ${!showProgressBar ? 'validating-progress-hidden' : ''}`}>
               <ProgressBar now={uploadProgress.completed} animated />
               <span className="loading">{uploadProgress.completed !== 100 ? 'Laster opp' : 'Genererer kart'}</span>
            </div>
         </div> :
         <div className="file file-no-map">
            {file.fileName} ({file.size})

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