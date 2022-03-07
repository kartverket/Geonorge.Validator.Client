import axios from 'axios';
import { useModals } from 'context/ModalsContext';
import { useDispatch } from 'react-redux';
import { setUploadProgress, toggleLoading } from 'store/slices/apiSlice';

export default function useApi() {
   const { openModal } = useModals();
   const dispatch = useDispatch();

   async function sendAsync(taskId, url, data, options = {}, progressBar = true) {
      try {
         dispatch(toggleLoading(taskId));

         if (progressBar) {
            dispatch(setUploadProgress({ uploadProgress: 0 }));
         }

         const defaultOptions = { 
            method: 'post', 
            url, 
            data,
            onUploadProgress: progressEvent => {
               const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
               dispatch(setUploadProgress({ uploadProgress: percentCompleted }));
            }
         };


         const response = await axios({ ...defaultOptions, ...options });
         dispatch(toggleLoading(taskId));

         return response.data || null;
      } catch (error) {       
         dispatch(toggleLoading(taskId));
         openModal('ERROR', { title: 'Feil', message: getMessage(error) });

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

   return sendAsync;
}
