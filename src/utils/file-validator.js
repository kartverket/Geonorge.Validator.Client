import fileSize from 'filesize';

const MAX_FILE_SIZE_MAP = process.env.REACT_APP_MAX_FILE_SIZE_MAP;
const VALID_DIMENSIONS = process.env.REACT_APP_MAP_VALID_DIMENSIONS;
const VALID_EPSG_CODES = process.env.REACT_APP_MAP_VALID_EPSG_CODES.split(',');
const XSD_RULE_ID = process.env.REACT_APP_XSD_RULE_ID;
const GML_REGEX = /<\?xml.*?<gml:FeatureCollection.*?xmlns:gml="http:\/\/www\.opengis\.net\/gml\/3\.2"/s;
const DIMENSIONS_REGEX = /srsDimension="(?<dimensions>\d)"/;
const EPSG_REGEX = /srsName="(http:\/\/www\.opengis\.net\/def\/crs\/EPSG\/0\/|urn:ogc:def:crs:EPSG::)(?<epsg>\d+)"/;

export async function validateFilesForMapView(files, validationResult) {
   const validatedFiles = [];

   for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const messages = await validateFileForMapView(file, validationResult);
      
      validatedFiles.push({ 
         messages, 
         fileName: file.name,
         blob: !messages.length ? new File([file], file.name) : null
      });
   }

   return validatedFiles;   
}

async function validateFileForMapView(file, validationResult) {
    const validFileSize = file.size <= MAX_FILE_SIZE_MAP;
    const messages = [];

    /*if (!validFileSize) {
        messages.push(`Maksimal filstørrelse for kartvisning er ${fileSize(MAX_FILE_SIZE_MAP)}`);        
        return messages;
    }*/

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

    if (epsgMatch === null || !VALID_EPSG_CODES.includes(epsgMatch.groups.epsg)) {
        messages.push(`GML-filen har ugyldig koordinatsystem. Gyldige koordinatsystem er: ${VALID_EPSG_CODES.join(', ')}`);
    }

    const dimensionsMatch = DIMENSIONS_REGEX.exec(fileContents);
    
    if (dimensionsMatch === null || VALID_DIMENSIONS !== dimensionsMatch.groups.dimensions) {
        messages.push('GML-filens geometrier må være i to dimensjoner');
    }

    return messages;
}

function xsdRuleFailed(file, validationResult) {
    const xsdRule = validationResult.rules.find(rule => rule.id === XSD_RULE_ID);

    return xsdRule !== undefined && xsdRule.messages.some(message => message.fileName === file.name);
}