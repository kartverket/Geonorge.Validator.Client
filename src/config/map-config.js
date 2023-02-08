import axios from 'axios';
import proj4 from 'proj4';
import { register } from 'ol/proj/proj4';
import { get as getProjection } from 'ol/proj';

const MAP_SETTINGS_API_URL = process.env.REACT_APP_MAP_SETTINGS_API_URL;

export let mapConfig = {};

export async function configureMap() {
   try {
      await loadMapConfig();
      addProj4Defs();
      setWmtsExtents();
   } catch {
   }
}

async function loadMapConfig() {
   const response = await axios.get(MAP_SETTINGS_API_URL);
   mapConfig = response.data;
   Object.freeze(mapConfig);
}

function addProj4Defs() {
   mapConfig.projections.forEach(projection => {
      proj4.defs(projection.epsg.codeString, projection.proj4);
      proj4.defs(projection.uri, proj4.defs(projection.epsg.codeString));
      proj4.defs(projection.urn, proj4.defs(projection.epsg.codeString));
   });
   
   register(proj4);
}

function setWmtsExtents() {
   mapConfig.wmtsExtents.forEach(data => {
      data.epsgCodes.forEach(code => {
         const proj = getProjection(`EPSG:${code}`);
         proj.setExtent(data.extent);
      })
   });
}