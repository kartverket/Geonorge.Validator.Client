import fileSize from 'filesize';

const MAX_FILE_SIZE_MAP = process.env.REACT_APP_MAX_FILE_SIZE_MAP;
const VALID_DIMENSIONS = process.env.REACT_APP_MAP_VALID_DIMENSIONS;
const VALID_EPSG_CODES = process.env.REACT_APP_MAP_VALID_EPSG_CODES.split(',');
const GML_REGEX = /<\?xml.*?<\w+:FeatureCollection.*?xmlns:\w+="http:\/\/www\.opengis\.net\/gml\/3\.2"/s;
const DIMENSIONS_REGEX = /srsDimension="(?<dimensions>\d)"/;
const EPSG_REGEX = /srsName="(http:\/\/www\.opengis\.net\/def\/crs\/EPSG\/0\/|urn:ogc:def:crs:EPSG::|EPSG:)(?<epsg>\d+)"/i;

export async function validateFilesForMapView(files) {
   const validatedFiles = [];

   for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const messages = await validateFileForMapView(file);
      
      validatedFiles.push({ 
         messages, 
         fileName: file.name,
         size: fileSize(file.size, { separator: ',', standard: 'jedec'}),
         blob: !messages.length ? new File([file], file.name) : null
      });
   }

   return validatedFiles;   
}

async function validateFileForMapView(file) {
    const validFileSize = file.size <= MAX_FILE_SIZE_MAP;
    const messages = [];

    if (!validFileSize) {
        messages.push(`Maksimal filstørrelse for kartvisning er ${fileSize(MAX_FILE_SIZE_MAP, { standard: 'jedec' })}`);        
        return messages;
    }

    const fileContents = await file.slice(0, 100000).text();

    if (!GML_REGEX.test(fileContents)) {
        messages.push('Filen er ikke en GML-fil');
        return messages;
    }

    const epsgMatch = EPSG_REGEX.exec(fileContents);

    if (epsgMatch === null || !VALID_EPSG_CODES.includes(epsgMatch.groups.epsg)) {
        messages.push(`GML-filen benytter koordinatsystemet '${epsgMatch.groups.epsg}'. Kartvisningen støtter kun følgende koordinatsystemer: ${VALID_EPSG_CODES.join(', ')}`);
    }

    const dimensionsMatch = DIMENSIONS_REGEX.exec(fileContents);
    
    if (dimensionsMatch === null || VALID_DIMENSIONS !== dimensionsMatch.groups.dimensions) {
        messages.push('Kartvisningen støtter kun todimensjonale geometrier');
    }

    return messages;
}
