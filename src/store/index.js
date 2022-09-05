import { configureStore } from '@reduxjs/toolkit';
import progressReducer from './slices/progressSlice';
import mapReducer from './slices/mapSlice';
import modalReducer from './slices/modalSlice';
import tabReducer from './slices/tabSlice';
import notificationReducer from './slices/notificationSlice';
import validationReducer from './slices/validationSlice';

export default configureStore({
   reducer: {
      progress: progressReducer,
      map: mapReducer,
      modals: modalReducer,
      tab: tabReducer,
      notification: notificationReducer,
      validation: validationReducer
   }
});
