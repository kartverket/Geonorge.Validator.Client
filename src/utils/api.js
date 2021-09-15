import axios from 'axios';
import store from 'store';
import { toggleLoading } from 'store/slices/apiSlice';
import { showDialog } from 'store/slices/dialogSlice';

export const sendAsync = async (url, data, options = {}) => {
   try {
      store.dispatch(toggleLoading({ loading: true }));

      const defaultOptions = {
         method: 'post',
         url,
         data
      };

      const response = await axios(Object.assign(defaultOptions, options));
      store.dispatch(toggleLoading({ loading: false }));

      return response.data || null;
   } catch (error) {
      const message = (error.response && error.response.data) ? error.response.data : error.message;
      store.dispatch(toggleLoading({ loading: false }));
      store.dispatch(showDialog({ title: 'Feil', body: message }));
      
      return null;
   }
}

