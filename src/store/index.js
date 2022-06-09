import { configureStore } from '@reduxjs/toolkit';
import progressReducer from './slices/progressSlice';
import mapReducer from './slices/mapSlice';
import tabReducer from './slices/tabSlice';
import notificationReducer from './slices/notificationSlice';

export default configureStore({
   reducer: {
      progress: progressReducer,
      map: mapReducer,
      tab: tabReducer,
      notification: notificationReducer
   }
});
