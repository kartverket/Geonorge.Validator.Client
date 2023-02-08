import { mapConfig } from 'config/map-config';

export function createMapDocument(file, featureCollection, epsgCode, rules) {
   const projection = mapConfig.projections.find(projection => projection.epsg.code === epsgCode);

   featureCollection.features.forEach(feature => {
      const objtype = feature.properties.objtype;
      
      if (objtype) {
         feature.properties._name = objtype;

         if (feature.properties.lokalId) {
            feature.properties.id = feature.properties.lokalId;
            feature.properties._label = `${objtype} '${feature.properties.lokalId}'`;
         }
      } else {
         feature.properties._name = 'Layer 1';
         feature.properties._label = 'Layer 1';
      }
   });
   
   return {
      fileName: file.name,
      fileSize: file.size,
      projection,
      geoJson: featureCollection,
      validationResult: { 
         rules: rules || [] 
      },
      styling: null
   };
}