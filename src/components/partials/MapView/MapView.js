import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { FeatureContextMenu, FeatureInfo, GenericLegend, SldLegend, MapInfo, MapNorthArrow, ScaleBar, ValidationErrors } from 'components/partials';
import { ZoomToExtent } from 'ol/control';
import { click } from 'ol/events/condition';
import { Select } from 'ol/interaction';
import { useDispatch, useSelector } from 'react-redux';
import { toggleMapLoading } from 'store/slices/progressSlice';
import { toggleFeatureInfo } from 'store/slices/mapSlice';
import { setActiveTab } from 'store/slices/tabSlice';
import { addGenericLegendToFeatures, addGeometryInfo, addSldLegendToFeatures, highlightSelectedFeatures, toggleFeatures } from 'utils/map/features';
import { debounce, getLayer } from 'utils/map/helpers';
import { createGenericLegend } from 'utils/map/legend';
import { createSldLegend, filterLegend } from 'utils/map/sld-legend';
import { createMap } from 'utils/map/map';
import { addGenericStyling, updateFeatureZIndex } from 'utils/map/styling';
import './MapView.scss';

function MapView({ mapDocument, mapId }) {
   const [map, setMap] = useState(null);
   const [contextMenuData, setContextMenuData] = useState(null);
   const [features, setFeatures] = useState([]);
   const [selectedFeatures, setSelectedFeatures] = useState([]);
   const [genericLegend, setGenericLegend] = useState([]);
   const [sldLegend, setSldLegend] = useState([]);
   const [filteredLegend, setFilteredLegend] = useState([]);
   const [symbols, setSymbols] = useState([]);
   const [mapRendered, setMapRendered] = useState(false);
   const [sidebarVisible, setSidebarVisible] = useState(true);
   const legend = useSelector(state => state.map.legend);
   const activeTab = useSelector(state => state.tab.activeTab);
   const mapElement = useRef();
   const mapCreated = useRef(false);
   const sidebarVisibleRef = useRef(true);
   const dispatch = useDispatch();

   useEffect(
      () => {
         if (activeTab !== mapId || map === null) {
            return;
         }

         setTimeout(() => {
            map.updateSize();

            if (!mapRendered) {
               const vectorLayer = getLayer(map, 'features');
               const extent = vectorLayer.getSource().getExtent();
               const view = map.getView();

               view.fit(extent, map.getSize());
               setMapRendered(true);
               dispatch(toggleMapLoading({ mapLoading: false }));
            }
         }, 1);
      },
      [map, mapId, mapRendered, activeTab, dispatch]
   );

   const selectFeature = useCallback(
      features => {
         addGeometryInfo(features);
         highlightSelectedFeatures(map, features);
         setSelectedFeatures([...features]);
         dispatch(toggleFeatureInfo({ expanded: true }));
      },
      [map, dispatch]
   );

   const addMapInteraction = useCallback(
      () => {
         const selectClick = new Select({
            condition: click,
            layers: layer => layer.get('id') === 'features',
            multi: true,
            hitTolerance: 5,
            style: null
         });

         map.addInteraction(selectClick);

         selectClick.on('select', event => {
            const features = event.target.getFeatures();

            if (features.getLength() === 1) {
               selectFeature(features.getArray());
            } else if (features.getLength() > 1) {
               const originalEvent = event.mapBrowserEvent.originalEvent;
               setContextMenuData({ left: originalEvent.offsetX, top: originalEvent.offsetY, features });
            }
         });
      },
      [map, selectFeature]
   );

   const { onWindowResize } = useMemo(
      () => {
         const onWindowResize = debounce(_ => {
            map.updateSize();
         }, 500);

         return { onWindowResize };
      },
      [map]
   );

   useEffect(
      () => {
         async function create() {
            mapCreated.current = true;

            const olMap = await createMap(mapDocument);
            const vectorLayer = getLayer(olMap, 'features');
            const features = vectorLayer.getSource().getFeatures()

            if (mapDocument.styling) {
               const legend = await createSldLegend(mapDocument.styling);
               setSldLegend(legend);
               setSymbols(legend.flatMap(leg => leg.symbols));
            } else {
               const legend = await createGenericLegend(vectorLayer);
               addGenericStyling(features, legend);
               setGenericLegend(legend);
               setSymbols(legend);
            }

            setMap(olMap);
            setFeatures(features);            
         }
         
         if (mapDocument && mapCreated.current === false) {
            create();
         }
      },
      [mapDocument]
   );

   useEffect(
      () => {
         if (!map) {
            return;
         }

         map.setTarget(mapElement.current);

         const vectorLayer = getLayer(map, 'features');
         const extent = vectorLayer.getSource().getExtent();
         const view = map.getView();

         view.fit(extent, map.getSize());
         view.setMinZoom(Math.floor(view.getZoom() - 2));
         view.setMaxZoom(18);

         map.addControl(new ZoomToExtent({ extent }));
         addMapInteraction();

         window.addEventListener('resize', onWindowResize);
         dispatch(setActiveTab({ activeTab: mapId }));

         return () => {
            map.dispose();
            window.removeEventListener('resize', onWindowResize);
            setSelectedFeatures([]);
         }
      },
      [map, mapId, selectFeature, addMapInteraction, onWindowResize, dispatch]
   );

   useEffect(
      () => {
         if (features.length) {
            if (sldLegend.length) {
               addSldLegendToFeatures(features, sldLegend);
               setFilteredLegend(filterLegend(sldLegend, features));
            } else if (genericLegend.length) {
               addGenericLegendToFeatures(features, genericLegend);
            }
         }
      },
      [features, sldLegend, genericLegend]
   );

   useEffect(
      () => {
         if (legend.name && map) {
            toggleFeatures(legend, map);
         }
      },
      [legend, map]
   );

   useEffect(
      () => {
         if (map && sidebarVisible !== sidebarVisibleRef.current) {
            map.updateSize();
            sidebarVisibleRef.current = sidebarVisible;
         }
      },
      [sidebarVisible, map]
   );

   function handleLegendSorted(sortedLegend) {
      if (sortedLegend.every((symbol, index) => symbol.name === genericLegend[index].name)) {
         return;
      }

      updateFeatureZIndex(map, sortedLegend);
      setGenericLegend(sortedLegend);
   }

   return (
      <div className={`content ${!sidebarVisible ? 'sidebar-hidden' : ''}`}>
         <div className="left-content">
            <MapInfo mapDocument={mapDocument} map={map} />
            {
               sldLegend.length ?
                  <SldLegend legend={filteredLegend} /> :
                  <GenericLegend legend={genericLegend} onListSorted={handleLegendSorted} />
            }
         </div>

         <div className="right-content">
            <div
               className="toggle-sidebar"
               role="button"
               onClick={() => setSidebarVisible(!sidebarVisible)}
               title={sidebarVisible ? 'Lukk sidepanel' : 'Vis sidepanel'}
            >
            </div>

            <div className="map-container">
               <div ref={mapElement} className="map"></div>
            </div>

            <ScaleBar map={map} numberOfSteps={4} minWidth={150} />
            <MapNorthArrow map={map} />
            <FeatureContextMenu map={map} data={contextMenuData} symbols={symbols} onFeatureSelect={selectFeature} />
            <FeatureInfo map={map} features={selectedFeatures} symbols={symbols} />
            <ValidationErrors map={map} validationResult={mapDocument?.validationResult} onMessageClick={selectFeature} />
         </div>
      </div>
   );
}

export default MapView;