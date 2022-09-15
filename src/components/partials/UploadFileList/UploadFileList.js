import fileSize from 'filesize';
import './UploadFileList.scss';

function UploadFileList({ files, uploadElement }) {
   if (!files.length) {
      return null;
   }

   function removeFile(file) {
      uploadElement.current.removeFile(file);
   }

   function getExtension(file) {
      return file.extension === 'geojson' ? 'json' : file.extension;
   }

   return (
      <div className="file-list">
         {
            files.map((file, index) => {
               return (
                  <div className="file" key={'file-' + index}>
                     <div className="type">
                        <div className={`icon icon--${file.extension}`}>
                           <span>{getExtension(file)}</span>
                        </div>
                     </div>

                     <div className="info">
                        <span className="name">{file.name}</span>
                        <span className="size">{fileSize(file.size, { separator: ',', standard: 'jedec' })}</span>
                     </div>

                     <div className="remove">
                        <button onClick={() => removeFile(file)} title="Slett"></button>
                     </div>
                  </div>
               );
            })
         }
      </div>
   );
}

export default UploadFileList;