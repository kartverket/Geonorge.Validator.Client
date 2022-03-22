import { createSlice } from '@reduxjs/toolkit';

const initialState = {
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
      toggleSymbol: (state, action) => {
         return { 
            ...state, 
            symbol: {
               ...state.symbol, ...action.payload
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

export const { toggleSymbol, toggleFeatureInfo } = mapSlice.actions;

export default mapSlice.reducer;