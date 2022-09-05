import axios from 'axios';
import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { openModal } from 'store/slices/modalSlice';
import { setUploadProgress, toggleLoading } from 'store/slices/progressSlice';

export default function useApi() {
   const dispatch = useDispatch();
   
   const get = useCallback(
      async (taskId, url, options = {}) => {
         try {
            dispatch(toggleLoading(taskId));

            const defaultOptions = {
               method: 'get',
               url
            };

            const response = await axios({ ...defaultOptions, ...options });
            dispatch(toggleLoading(taskId));

            return Promise.resolve(response.data || null);
         } catch (error) {
            dispatch(toggleLoading(taskId));

            const errorMessage = getMessage(error);
            dispatch(openModal({ type: 'ERROR', title: 'Feil!', body: errorMessage }));

            return await Promise.reject(errorMessage);
         }
      },
      [dispatch]
   );

   const post = useCallback(
      async (taskId, url, data, options = {}) => {
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

         try {
            const response = await axios({ ...defaultOptions, ...options });
            dispatch(toggleLoading(taskId));
            dispatch(setUploadProgress({ uploadProgress: {} }));

            return Promise.resolve(response.data || null);
         } catch (error) {
            dispatch(toggleLoading(taskId));
            dispatch(setUploadProgress({ uploadProgress: {} }));

            const errorMessage = getMessage(error);
            dispatch(openModal({ type: 'ERROR', title: 'Feil!', body: errorMessage }));

            return await Promise.reject(errorMessage);
         }
      },
      [dispatch]
   );

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

   return { get, post }
}
