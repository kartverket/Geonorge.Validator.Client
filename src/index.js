import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { configureMap } from 'config/map-config';
import App from './App';
import store from 'store';
import './index.scss';

const container = document.getElementById('root');
const root = createRoot(container);

(async () => {
   await configureMap();

   root.render(
      <React.StrictMode>
         <Provider store={store}>
            <App />
         </Provider>
      </React.StrictMode>
   );
})();


