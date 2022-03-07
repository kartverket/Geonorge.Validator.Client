import React, { useEffect, useState } from 'react';
import { MapView, Validator } from 'components/partials';
import { Tabs, Tab } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { setActiveTab } from 'store/slices/tabSlice';
import MapViewContext from 'context/MapViewContext';
import './App.scss';

const OPEN_API_URL = process.env.REACT_APP_OPEN_API_URL;

function App() {
   const [mapViews, setMapViews] = useState([]);
   const [activeTabKey, setActiveTabKey] = useState(null);
   const [fullscreen, setFullscreen] = useState(false);
   const activeTab = useSelector(state => state.tab.activeTab);
   const dispatch = useDispatch();

   useEffect(
      () => {
         setActiveTabKey(activeTab);
      },
      [activeTab]
   );

   useEffect(
      () => {
         function handleFullscreenChange() {
            setFullscreen(document.fullscreenElement !== null);
         }

         document.addEventListener('fullscreenchange', handleFullscreenChange)

         return () => {
            document.removeEventListener('fullscreenchange', handleFullscreenChange);
         }
      },
      []
   );

   function handleTabSelect(tabKey, event) {
      if (tabKey === 'api-link') {
         window.open(OPEN_API_URL, '_blank');
         event.preventDefault();
         return;
      }

      dispatch(setActiveTab({ activeTab: tabKey }));
   }

   function handleToggleFullscreenClick() {
      if (!document.fullscreenElement) {
         document.documentElement.requestFullscreen();
      } else if (document.exitFullscreen) {
         document.exitFullscreen();
      }
   }

   function handleApiResponse(response) {
      if (response === null) {
         setMapViews([]);
      }
   }

   return (
      <MapViewContext.Provider value={[mapViews, setMapViews]}>
         <div className={`app ${fullscreen ? 'fullscreen-toggled' : ''}`}>
            <div
               role="button"
               className="toggle-fullscreen"
               title={fullscreen ? 'Avslutt fullskjerm' : 'Vis i fullskjerm'}
               onClick={handleToggleFullscreenClick}
            >
            </div>

            <Tabs defaultActiveKey="validator" activeKey={activeTabKey} onSelect={handleTabSelect} transition={false}>
               <Tab eventKey="validator" title="Validator">
                  <Validator onApiResponse={handleApiResponse} />
               </Tab>
               {mapViews.map(mapView => {
                  return (
                     <Tab tabClassName="map-tab" key={mapView.mapId} eventKey={mapView.mapId} title={mapView.mapDocument.fileName}>
                        <MapView mapDocument={mapView.mapDocument} mapId={mapView.mapId} tabKey={mapView.mapId} activeTabKey={activeTabKey} />
                     </Tab>
                  );
               })}
               <Tab tabClassName="api-link" eventKey="api-link" title="Open API">
                  <span></span>
               </Tab>
            </Tabs>
         </div>
      </MapViewContext.Provider>
   );
}

export default App;
