import { createSlice } from '@reduxjs/toolkit';

const initialState = {
   skippedRules: []
};

export const validationSlice = createSlice({
   name: 'validation',
   initialState,
   reducers: {
      skipRule: (state, action) => {
         const index = state.skippedRules.indexOf(action.payload);

         if (index === -1) {
            return {
               ...state,
               skippedRules: [...state.skippedRules, action.payload]
            };
         } else {
            return {
               ...state,
               skippedRules: [...state.skippedRules.slice(0, index), ...state.skippedRules.slice(index + 1)]
            };
         }
      }
   }
});

export const { skipRule } = validationSlice.actions;

export default validationSlice.reducer;