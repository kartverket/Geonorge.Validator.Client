import React, { useEffect, useState } from 'react';
import { MapView, Validate, ValidationReponse } from 'components/partials';
import { Tabs, Tab } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { setActiveTab } from 'store/slices/tabSlice';
import MapViewContext from 'context/MapViewContext';
import './App.scss';

const OPEN_API_URL = process.env.REACT_APP_OPEN_API_URL;

function App() {
   const [apiResponse, setApiResponse] = useState(null);
   const [mapViews, setMapViews] = useState([]);
   const [activeTabKey, setActiveTabKey] = useState(null);
   const activeTab = useSelector(state => state.tab.activeTab);
   const dispatch = useDispatch();

   useEffect(
      () => {
         setActiveTabKey(activeTab);
      },
      [activeTab]
   );

   function handleTabSelect(tabKey, event) {
      if (tabKey === 'api-link') {
         window.open(OPEN_API_URL, '_blank');
         event.preventDefault();
         return;
      }

      dispatch(setActiveTab({ activeTab: tabKey }));
   }

   function handleApiResponse(response) {
      setApiResponse(response);

      if (response === null) {
         setMapViews([]);
      }
   }

   return (
      <MapViewContext.Provider value={[mapViews, setMapViews]}>
         <div className="app">
            <Tabs defaultActiveKey="validator" activeKey={activeTabKey} onSelect={handleTabSelect} transition={false}>
               <Tab eventKey="validator" title="Validator">
                  <div className="validator">
                     <div>
                        <Validate onApiResponse={handleApiResponse} />
                     </div>
                     {
                        apiResponse !== null ?
                           <div>
                              <ValidationReponse apiResponse={apiResponse} />
                           </div> :
                           null
                     }
                  </div>
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
