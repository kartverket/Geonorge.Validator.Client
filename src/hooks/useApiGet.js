import axios from 'axios';
import { modalType } from 'components/modals';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { openModal } from 'store/slices/modalSlice';

export default function useApiGet(url, options) {
   const [data, setData] = useState(null);
   const [error, setError] = useState('');
   const [loaded, setLoaded] = useState(false);
   const dispatch = useDispatch();


   useEffect(
      () => {
         const opts = options || {};

         (async () => {            
            try {
               const response = await axios.get(url, opts);
               setData(response.data);
            } catch (error) {
               dispatch(openModal({ type: modalType.ERROR, title: 'Feil!', body: error.message }));
               setError(error.message);
            } finally {
               setLoaded(true);
            }
         })();
      },
      [url, dispatch, options]
   );

   return { data, error, loaded };
};