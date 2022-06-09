import axios from 'axios';
import { useEffect, useState } from 'react';

export default function useApiGet(url) {
   const [data, setData] = useState(null);
   const [error, setError] = useState('');
   const [loaded, setLoaded] = useState(false);

   useEffect(
      () => {
         (async () => {
            try {
               const response = await axios.get(url);
               setData(response.data);
            } catch (error) {
               setError(error.message);
            } finally {
               setLoaded(true);
            }
         })();
      },
      [url]
   );

   return { data, error, loaded };
};