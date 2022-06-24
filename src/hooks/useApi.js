import axios from 'axios';
import { useDispatch } from 'react-redux';
import { openModal } from 'store/slices/modalSlice';
import { setUploadProgress, toggleLoading } from 'store/slices/progressSlice';

export default function useApi() {
   const dispatch = useDispatch();

   async function fetchAsync(taskId, url, data, options = {}) {
      try {
         dispatch(toggleLoading(taskId));
         dispatch(setUploadProgress({ uploadProgress: { completed: 0, taskId } }));

         const defaultOptions = {
            method: 'post',
            url,
            data,
            onUploadProgress: progressEvent => {
               const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
               dispatch(setUploadProgress({ uploadProgress: { completed: percentCompleted, taskId } }));
            }
         };

         const response = await axios({ ...defaultOptions, ...options });
         dispatch(toggleLoading(taskId));
         dispatch(setUploadProgress({ uploadProgress: {} }));

         return response.data || null;
      } catch (error) {
         dispatch(toggleLoading(taskId));
         dispatch(setUploadProgress({ uploadProgress: {} }));
         dispatch(openModal({ type: 'ERROR', title: 'Feil!', body: getMessage(error) }));

         return null;
      }
   }

   function getMessage(error) {
      if (!error.response) {
         return error.message;
      }

      switch (error.response.status) {
         case 400:
            return error.response.data;
         default:
            return error.message;
      }
   }

   return fetchAsync;
}
