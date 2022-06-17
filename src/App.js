import React, { useEffect, useState, Fragment, useRef } from 'react';
import { Footer, Information, MainNavigationContainer, MapView, Validator } from 'components/partials';
import { Tabs, Tab } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { setActiveTab } from 'store/slices/tabSlice';
import MapViewContext from 'context/MapViewContext';
import './App.scss';
import Modals from 'components/partials/Modals/Modals';
import { openModal } from 'store/slices/modalSlice';
import { createRandomId } from 'utils/map/helpers';
import { useApi } from 'hooks';

const OPEN_API_URL = process.env.REACT_APP_OPEN_API_URL;
const RULESETS_API_URL = process.env.REACT_APP_RULESETS_API_URL;

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

   function openMod1() {
      dispatch(openModal({ type: 'ERROR', title: 'Feil!', message: 'Whatevah!' }));
   }

   
   function openMod2() {
      dispatch(openModal({ type: 'ERROR', title: 'Informasjon', message: 'Whatevah!' }));
   }


   return (
      <Fragment>
         <MainNavigationContainer />
         <MapViewContext.Provider value={[mapViews, setMapViews]}>
            <div className="app">
               <button onClick={openMod1}>Åpne feil</button>
               <button onClick={openMod2}>Åpne info</button>
               <div className='container'>
                  <button
                     className="toggle-fullscreen"
                     title={fullscreen ? 'Avslutt fullskjerm' : 'Vis i fullskjerm'}
                     onClick={handleToggleFullscreenClick}
                  >
                  </button>
                  <Tabs defaultActiveKey="validator" activeKey={activeTabKey} onSelect={handleTabSelect} transition={false}>
                     <Tab eventKey="validator" tabClassName="validator-tab" title="GML-validator">
                        <Validator onApiResponse={handleApiResponse} />
                     </Tab>
                     <Tab eventKey="info" tabClassName="info-tab" title="Informasjon">
                        <Information />
                     </Tab>                     
                     {mapViews.map(mapView => {
                        return (
                           <Tab tabClassName="map-tab" key={mapView.mapId} eventKey={mapView.mapId} title={mapView.mapDocument.fileName}>
                              <MapView mapDocument={mapView.mapDocument} mapId={mapView.mapId} tabKey={mapView.mapId} activeTabKey={activeTabKey} />
                           </Tab>
                        );
                     })}
                     <Tab eventKey="api-link" tabClassName="api-link" title="Open API">
                        <span></span>
                     </Tab>
                  </Tabs>
               </div>
               <Footer />
            </div>
            <Modals />
         </MapViewContext.Provider>
      </Fragment>
   );
}

export default App;
