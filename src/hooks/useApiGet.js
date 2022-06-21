import axios from 'axios';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { openModal } from 'store/slices/modalSlice';
import { toggleLoading } from 'store/slices/progressSlice';

export default function useApiGet(url, options) {
   const [data, setData] = useState(null);
   const [error, setError] = useState('');
   const [loaded, setLoaded] = useState(false);
   const dispatch = useDispatch();
   
   useEffect(
      () => {
         (async () => {
            try {
               const b = options || {};
               dispatch(toggleLoading(b.taskId));
               const response = await axios.get(url, b);
               setData(response.data);
            } catch (error) {
               dispatch(openModal({ type: 'ERROR', title: 'Feil!', message: error.message }));
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