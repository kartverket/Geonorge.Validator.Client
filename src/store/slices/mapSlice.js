import { createSlice } from '@reduxjs/toolkit';

const initialState = {
   legend: {
      name: null,
      visible: true
   },
   symbol: {
      name: null,
      visible: true
   },
   featureInfo: {
      expanded: false
   }
};


export const mapSlice = createSlice({
   name: 'map',
   initialState,
   reducers: {
      toggleLegend: (state, action) => {
         return { 
            ...state, 
            legend: {
               ...state.legend, ...action.payload
            }
         };
      },
      toggleFeatureInfo: (state, action) => {
         return {
            ...state, 
            featureInfo: {
               ...state.featureInfo, ...action.payload
            }
         }
      }      
   }
});

export const { toggleLegend, toggleFeatureInfo } = mapSlice.actions;

export default mapSlice.reducer;