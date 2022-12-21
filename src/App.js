import { Fragment, useEffect, useState } from 'react';
import { Footer, Information, MainNavigationContainer, MapView, Validator } from 'components/partials';
import { Tabs, Tab } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { setActiveTab } from 'store/slices/tabSlice';
import { ErrorModal, InvalidFileModal } from 'components/modals';
import { MapViewContext } from 'context';
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

   function closeMapTab(event, mapId) {
      event.stopPropagation();
      
      const filtered = mapViews.filter(mapView => mapView.mapId !== mapId);
      setActiveTabKey('validator');
      handleTabSelect('validator');
      setMapViews(filtered);
   }

   return (
      <Fragment>
         <MainNavigationContainer />

         <div className="app">
            <div className='container'>
               <button
                  className="toggle-fullscreen"
                  title={fullscreen ? 'Avslutt fullskjerm' : 'Vis i fullskjerm'}
                  onClick={handleToggleFullscreenClick}
               >
               </button>
               
               <MapViewContext.Provider value={[mapViews, setMapViews]}>
                  <Tabs defaultActiveKey="validator" activeKey={activeTabKey} onSelect={handleTabSelect} transition={false}>
                     <Tab eventKey="validator" tabClassName="validator-tab" title="GML-validator">
                        <Validator onApiResponse={handleApiResponse} />
                     </Tab>
                     <Tab eventKey="info" tabClassName="info-tab" title="Informasjon">
                        <Information />
                     </Tab>
                     {mapViews.map(mapView => {
                        return (
                           <Tab 
                              tabClassName="map-tab" 
                              key={mapView.mapId} 
                              eventKey={mapView.mapId} 
                              title={
                                 <span>
                                    {mapView.mapDocument.fileName}
                                    <span className="map-tab-close" role="button" title="Lukk" onClick={event => closeMapTab(event, mapView.mapId)}></span>
                                 </span>
                              }
                           >
                              <MapView mapDocument={mapView.mapDocument} mapId={mapView.mapId} tabKey={mapView.mapId} activeTabKey={activeTabKey} />
                           </Tab>
                        );
                     })}
                     <Tab eventKey="api-link" tabClassName="api-link" title="Open API">
                        <span></span>
                     </Tab>
                  </Tabs>
               </MapViewContext.Provider>
            </div>
            <Footer />
         </div>

         <ErrorModal />
         <InvalidFileModal />
      </Fragment>
   );
}

export default App;
