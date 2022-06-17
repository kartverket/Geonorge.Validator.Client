import { createSlice } from '@reduxjs/toolkit';

const initialState = {
   toggled: []
};

export const modalSlice = createSlice({
   name: 'modals',
   initialState,
   reducers: {
      openModal: (state, action) => {
         console.log(state.toggled);
         const index = state.toggled.findIndex(modal => modal.type === action.payload.type);

         if (index === -1) {
            return { 
               toggled: [...state.toggled, action.payload]
            };
         }

         return [...state.toggled];
      },
      closeModal: (state, action) => {
         const index = state.toggled.findIndex(modal => modal.type === action.payload.type);

         if (index !== -1) {
            debugger
            return {
               toggled: [...state.toggled.slice(0, index), ...state.toggled.slice(index + 1)]
            };
         }

         return [...state.toggled];
      } 
   }
});

export const { openModal, closeModal } = modalSlice.actions;

export default modalSlice.reducer;