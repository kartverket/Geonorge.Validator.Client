import { configureStore } from '@reduxjs/toolkit';
import apiReducer from './slices/apiSlice';
import mapReducer from './slices/mapSlice';
import tabReducer from './slices/tabSlice';
import notificationReducer from './slices/notificationSlice';

export default configureStore({
   reducer: {
      api: apiReducer,
      map: mapReducer,
      tab: tabReducer,
      notification: notificationReducer
   }
});
