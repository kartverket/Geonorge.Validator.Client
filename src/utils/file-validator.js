import { mapConfig } from 'config/map-config';
import { filesize } from 'filesize';

const MAX_FILE_SIZE_MAP = process.env.REACT_APP_MAX_FILE_SIZE_MAP;
const XSD_RULE_ID = process.env.REACT_APP_XSD_RULE_ID;
const GML_REGEX = /<\?xml.*?<\w+:FeatureCollection.*?xmlns:\w+="http:\/\/www\.opengis\.net\/gml\/3\.2"/s;
const EPSG_REGEX = /srsName="(http:\/\/www\.opengis\.net\/def\/crs\/EPSG\/0\/|urn:ogc:def:crs:EPSG::|EPSG:)(?<epsg>\d+)"/;

export async function validateFilesForMapView(files, validationResult) {
   const validatedFiles = [];

   for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const result = await validateFileForMapView(file, validationResult);

      validatedFiles.push({
         result,
         fileName: file.name,
         size: filesize(file.size, { separator: ',', standard: 'jedec' }),
         blob: !result.messages.length ? new File([file], file.name) : null
      });
   }

   return validatedFiles;
}

async function validateFileForMapView(file, validationResult) {
   const validFileSize = file.size <= MAX_FILE_SIZE_MAP;

   const result = {
      messages: [],
      epsgCode: null,
      data: null,
      type: null
   };

   if (!validFileSize) {
      result.messages.push(`Maksimal filstørrelse for kartvisning er ${filesize(MAX_FILE_SIZE_MAP, { standard: 'jedec' })}`);
      return result;
   }

   if (xsdRuleFailed(file, validationResult)) {
      result.messages.push('Filen er ugyldig i henhold til applikasjonsskjemaet');
      return result;
   }

   const fileContents = await file.slice(0, 100000).text();
   const isGml = GML_REGEX.test(fileContents);
   let isGeoJson = true;
   let featureCollection;
   let epsgCode;

   if (isGml) {
      const epsgMatch = EPSG_REGEX.exec(fileContents);

      if (epsgMatch === null) {
         result.messages.push('GML-filen har ugyldig koordinatsystem.');
      } else {
         epsgCode = parseInt(epsgMatch.groups.epsg);
         result.type = 'GML';
   
         if (isNaN(epsgCode) || !mapConfig.supportedEpsgCodes.includes(epsgCode)) {
            result.messages.push('GML-filen har ugyldig koordinatsystem.');         
         }
      }

      return result;
   }

   const geoJson = await file.text();

   try {
      featureCollection = JSON.parse(geoJson);
   } catch {
      isGeoJson = false         
   }

   if (!isGml && !isGeoJson) {
      result.messages.push('Filen er ikke en GML- eller GeoJSON-fil.');
      return result;
   }

   if (featureCollection.type !== 'FeatureCollection' || !Array.isArray(featureCollection.features)) {
      result.messages.push('Filen er ikke en gyldig GeoJSON-fil.');
      return result;
   }

   const epsgCodeStr = featureCollection.crs?.properties?.name;

   if (epsgCodeStr) {
      epsgCode = parseInt(epsgCodeStr.split(':')[1]);

      if (isNaN(epsgCode) || !mapConfig.supportedEpsgCodes.includes(epsgCode)) {
         result.messages.push('GeoJSON-filen har ugyldig koordinatsystem.');
      }
   } else {
      result.messages.push('GeoJSON-filen har ikke angitt koordinatsystem.');
   }

   result.epsgCode = epsgCode;
   result.data = featureCollection;
   result.type = isGml ? 'GML' : 'GeoJSON';
   
   return result;
}

function xsdRuleFailed(file, validationResult) {
   const xsdRule = validationResult.rules.find(rule => rule.id === XSD_RULE_ID);

   return xsdRule !== undefined && xsdRule.messages.some(message => message.fileName === file.name);
}