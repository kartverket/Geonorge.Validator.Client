import { createSlice } from '@reduxjs/toolkit';

const initialState = {
   tasks: [],
   mapLoading: false,
   uploadProgress: 0
};

export const apiSlice = createSlice({
   name: 'api',
   initialState,
   reducers: {
      toggleLoading: (state, action) => {
         const index = state.tasks.indexOf(action.payload);

         if (index === -1) {
            return {
               ...state,
               tasks: [...state.tasks, action.payload]
            };
         } else {
            return {
               ...state,
               tasks: [...state.tasks.slice(0, index), ...state.tasks.slice(index + 1)]
            };
         }
      },
      toggleMapLoading: (state, action) => {
         return { 
            ...state, 
            ...action.payload 
         };
      },
      setUploadProgress: (state, action) => {
         return { 
            ...state, 
            ...action.payload 
         };
      }
   }
})

export const { toggleLoading, toggleMapLoading, setUploadProgress } = apiSlice.actions

export default apiSlice.reducer