import axios from 'axios';
import store from 'store';
import { setUploadProgress, toggleLoading } from 'store/slices/apiSlice';
import { showDialog } from 'store/slices/dialogSlice';

export const sendAsync = async (url, data, options = {}) => {
   try {
      store.dispatch(toggleLoading({ loading: true }));
      store.dispatch(setUploadProgress({ uploadProgress: 0 }));

      const defaultOptions = {
         method: 'post',
         url,
         data,
         onUploadProgress: progressEvent => {
            const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
            store.dispatch(setUploadProgress({ uploadProgress: percentCompleted }));
         }
      };

      const response = await axios(Object.assign(defaultOptions, options));
      store.dispatch(toggleLoading({ loading: false }));

      return response.data || null;
   } catch (error) {
      const message = (error.response && error.response.data) ? error.response.data : error.message;
      store.dispatch(toggleLoading({ loading: false }));
      store.dispatch(showDialog({ title: 'Feil', body: message, className: 'error-dialog' }));

      return null;
   }
}

