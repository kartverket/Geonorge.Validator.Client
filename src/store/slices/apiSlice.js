import { createSlice } from '@reduxjs/toolkit';

const initialState = {
   loading: false,
   uploadProgress: 0
};

export const apiSlice = createSlice({
   name: 'api',
   initialState,
   reducers: {
      toggleLoading: (state, action) => {
         return { ...state, ...action.payload };
      },
      setUploadProgress: (state, action) => {
         return { ...state, ...action.payload };
      }
   }
})

export const { toggleLoading, setUploadProgress } = apiSlice.actions

export default apiSlice.reducer