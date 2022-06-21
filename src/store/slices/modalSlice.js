import { createSlice } from '@reduxjs/toolkit';

const initialState = {
   opened: []
};

export const modalSlice = createSlice({
   name: 'modals',
   initialState,
   reducers: {
      openModal: (state, action) => {
         const index = state.opened.findIndex(modal => modal.type === action.payload.type);

         if (index === -1) {
            return { 
               opened: [...state.opened, action.payload]
            };
         }

         return [...state.opened];
      },
      closeModal: (state, action) => {
         const index = state.opened.findIndex(modal => modal.type === action.payload.type);

         if (index !== -1) {
            return {
               opened: [...state.opened.slice(0, index), ...state.opened.slice(index + 1)]
            };
         }

         return [...state.opened];
      } 
   }
});

export const { openModal, closeModal } = modalSlice.actions;

export default modalSlice.reducer;