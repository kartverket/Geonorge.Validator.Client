const SCHEMA_LOCATION_REGEX = /\w+:schemaLocation="(?<schemaLocation>.*?)"/;

export async function getSchemaUriFromFiles(files) {
   const schemaUrisInFiles = {};

   for (let i = 0; i < files.length; i++) {
      const fileContents = await files[i].slice(0, 50000).text();
      const match = SCHEMA_LOCATION_REGEX.exec(fileContents);

      if (match !== null) {
         const schemaLocations = match.groups.schemaLocation.split(' ').filter(Boolean);

         if (schemaLocations.length % 2 === 0) {
            for (let j = 1; j < schemaLocations.length; j += 2) {
               const uri = schemaLocations[j];
   
               if (uri in schemaUrisInFiles) {
                  schemaUrisInFiles[uri].push(files[i].name);
               } else {
                  schemaUrisInFiles[uri] = [files[i].name];
               }
            }
         }
      }
   }

   const schemaUri = Object.keys(schemaUrisInFiles).find(uri => {
      const fileNames = schemaUrisInFiles[uri];

      return fileNames.length === files.length && fileNames.every(fileName => files.some(file => file.name === fileName));
   });

   return schemaUri || null;
}