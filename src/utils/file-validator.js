import { mapConfig } from 'config/map-config';
import { filesize } from 'filesize';

const MAX_FILE_SIZE_MAP = process.env.REACT_APP_MAX_FILE_SIZE_MAP;
const XSD_RULE_ID = process.env.REACT_APP_XSD_RULE_ID;
const GML_REGEX = /<\?xml.*?<\w+:FeatureCollection.*?xmlns:\w+="http:\/\/www\.opengis\.net\/gml\/3\.2"/s;
const EPSG_REGEX = /srsName="(http:\/\/www\.opengis\.net\/def\/crs\/EPSG\/0\/|urn:ogc:def:crs:EPSG::)(?<epsg>\d+)"/;

export async function validateFilesForMapView(files, validationResult) {
   const validatedFiles = [];

   for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const messages = await validateFileForMapView(file, validationResult);

      validatedFiles.push({
         messages,
         fileName: file.name,
         size: filesize(file.size, { separator: ',', standard: 'jedec' }),
         blob: !messages.length ? new File([file], file.name) : null
      });
   }

   return validatedFiles;
}

async function validateFileForMapView(file, validationResult) {
   const validFileSize = file.size <= MAX_FILE_SIZE_MAP;
   const messages = [];

   if (!validFileSize) {
      messages.push(`Maksimal filstørrelse for kartvisning er ${filesize(MAX_FILE_SIZE_MAP, { standard: 'jedec' })}`);
      return messages;
   }

   if (xsdRuleFailed(file, validationResult)) {
      messages.push('GML-filen er ugyldig i henhold til applikasjonsskjemaet');
      return messages;
   }

   const fileContents = await file.slice(0, 100000).text();

   if (!GML_REGEX.test(fileContents)) {
      messages.push('Filen er ikke en GML-fil');
      return messages;
   }

   const epsgMatch = EPSG_REGEX.exec(fileContents);
   const epsgCode = parseInt(epsgMatch.groups.epsg);

   if (isNaN(epsgCode) || !mapConfig.supportedEpsgCodes.includes(epsgCode)) {
      messages.push('GML-filen har ugyldig koordinatsystem.');
   }

   return messages;
}

function xsdRuleFailed(file, validationResult) {
   const xsdRule = validationResult.rules.find(rule => rule.id === XSD_RULE_ID);

   return xsdRule !== undefined && xsdRule.messages.some(message => message.fileName === file.name);
}