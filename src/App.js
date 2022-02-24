import React, { useEffect, useState } from 'react';
import { MapView, Validate, ValidationReponse } from 'components/partials';
import { Tabs, Tab } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { setActiveTab } from 'store/slices/tabSlice';
import './App.scss';

const OPEN_API_URL = process.env.REACT_APP_OPEN_API_URL;
const MapViewContext = React.createContext(null);

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

   function handleTabSelect(tabKey) {
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
                     <div className="section">
                        <div>
                           <a href={OPEN_API_URL} target="_blank" rel="noreferrer">Klikk her for å gå til API</a>

                           <Validate onApiResponse={handleApiResponse} />
                        </div>
                     </div>
                     {
                        apiResponse !== null ?
                           <ValidationReponse apiResponse={apiResponse} /> :
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
            </Tabs>
         </div>
      </MapViewContext.Provider>
   );
}

export default App;
export { MapViewContext }