import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { FeatureContextMenu, FeatureInfo, Legend, MapInfo, MapNorthArrow, ScaleBar, ValidationErrors } from 'components/partials';
import { ZoomToExtent } from 'ol/control';
import { click } from 'ol/events/condition';
import { Select } from 'ol/interaction';
import { useDispatch, useSelector } from 'react-redux';
import { toggleMapLoading } from 'store/slices/apiSlice';
import { toggleFeatureInfo } from 'store/slices/mapSlice';
import { setActiveTab } from 'store/slices/tabSlice';
import { addGeometryInfo, addLegendToFeatures, highlightSelectedFeatures, toggleFeatures } from 'utils/map/features';
import { debounce, getLayer } from 'utils/map/helpers';
import { createLegend } from 'utils/map/legend';
import { createMap } from 'utils/map/map';
import { addStyling } from 'utils/map/styling';
import './MapView.scss';

function MapView({ mapDocument, mapId }) {
   const [map, setMap] = useState(null);
   const [contextMenuData, setContextMenuData] = useState(null);
   const [features, setFeatures] = useState([]);
   const [selectedFeatures, setSelectedFeatures] = useState([]);
   const [legend, setLegend] = useState([]);
   const [mapRendered, setMapRendered] = useState(false);
   const symbol = useSelector(state => state.map.symbol);
   const sidebar = useSelector(state => state.map.sidebar);
   const activeTab = useSelector(state => state.tab.activeTab);
   const sidebarVisible = useRef(true);
   const mapElement = useRef();
   const dispatch = useDispatch();

   useEffect(
      () => {
         if (activeTab !== mapId) {
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
            const olMap = createMap(mapDocument);
            const vectorLayer = getLayer(olMap, 'features');
            const legend = await createLegend(vectorLayer);
            const features = vectorLayer.getSource().getFeatures()

            addStyling(features, legend);
            setLegend(legend);
            setMap(olMap);
            setFeatures(features);
         }

         if (mapDocument) {
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
         if (features.length && legend.length) {
            addLegendToFeatures(features, legend);
         }
      },
      [features, legend]
   );

   useEffect(
      () => {
         if (symbol.name && map) {
            toggleFeatures(symbol, map);
         }
      },
      [symbol, map]
   );

   useEffect(
      () => {
         if (map && sidebar.visible !== sidebarVisible.current) {
            map.updateSize();
            sidebarVisible.current = sidebar.visible;
         }
      },
      [sidebar, map]
   );

   return (
      <div className={`content ${!sidebar.visible ? 'sidebar-hidden' : ''}`}>
         <div className="left-content">
            <MapInfo mapDocument={mapDocument} map={map} />
            <Legend legend={legend} />
         </div>

         <div className="right-content">
            <div className="map-container">
               <div ref={mapElement} className="map"></div>
            </div>

            <ScaleBar map={map} numberOfSteps={4} minWidth={150} />
            <MapNorthArrow map={map} />
            <FeatureContextMenu map={map} data={contextMenuData} legend={legend} onFeatureSelect={selectFeature} />
            <FeatureInfo map={map} features={selectedFeatures} legend={legend} />
            <ValidationErrors map={map} validationResult={mapDocument?.validationResult} onMessageClick={selectFeature} />
         </div>
      </div>
   );
}

export default MapView;