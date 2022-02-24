import { configureStore } from '@reduxjs/toolkit';
import apiReducer from './slices/apiSlice';
import mapReducer from './slices/mapSlice';
import tabReducer from './slices/tabSlice';

export default configureStore({
   reducer: {
      api: apiReducer,
      map: mapReducer,
      tab: tabReducer
   }
});
