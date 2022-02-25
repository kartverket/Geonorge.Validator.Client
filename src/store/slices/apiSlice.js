import { createSlice } from '@reduxjs/toolkit';

const initialState = {
   tasks: [],
   loading: false,
   uploadProgress: 0
};

export const apiSlice = createSlice({
   name: 'api',
   initialState,
   reducers: {
      toggleLoading: (state, action) => {
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
      },
      toggleLoading2: (state, action) => {
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
      }
   }
})

export const { toggleLoading, setUploadProgress, toggleLoading2 } = apiSlice.actions

export default apiSlice.reducer