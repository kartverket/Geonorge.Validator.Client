import { createSlice } from '@reduxjs/toolkit';

const initialState = {
   activeTab: 'validator'
};

export const tabSlice = createSlice({
   name: 'tab',
   initialState,
   reducers: {
      setActiveTab: (_, action) => {
         return { 
            ...action.payload 
         };
      }
   }
});

export const { setActiveTab } = tabSlice.actions;

export default tabSlice.reducer;