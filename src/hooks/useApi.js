import axios from 'axios';
import { useModals } from 'context/ModalsContext';
import { useDispatch } from 'react-redux';
import { setUploadProgress, toggleLoading } from 'store/slices/apiSlice';

export default function useApi() {
   const { openModal } = useModals();
   const dispatch = useDispatch();

   async function sendAsync(taskId, url, data, options = {}) {
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
         dispatch(setUploadProgress({ uploadProgress: {}}));

         return response.data || null;
      } catch (error) {
         dispatch(toggleLoading(taskId));
         dispatch(setUploadProgress({ uploadProgress: {}}));
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
