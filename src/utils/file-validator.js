import fileSize from 'filesize';

const MAX_FILE_SIZE_MAP = process.env.REACT_APP_MAX_FILE_SIZE_MAP;
const GML_REGEX = /<\?xml.*?<\w+:FeatureCollection.*?xmlns:\w+="http:\/\/www\.opengis\.net\/gml\/3\.2"/s;

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

    return messages;
}
