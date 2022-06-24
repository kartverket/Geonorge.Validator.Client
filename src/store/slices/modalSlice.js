import { createSlice } from '@reduxjs/toolkit';

const initialState = {
   added: []
};

export const modalSlice = createSlice({
   name: 'modals',
   initialState,
   reducers: {
      openModal: (state, action) => {
         const index = state.added.findIndex(modal => modal.type === action.payload.type);

         if (index !== -1) {
            return {
               ...state,
               added: [
                  ...state.added.slice(0, index),
                  { 
                     ...action.payload, 
                     visible: true 
                  },
                  ...state.added.slice(index + 1)
               ]
            };
         }

         return {
            ...state,
            added: [
               ...state.added,
               {
                  ...action.payload,
                  visible: true
               }
            ]
         };
      },
      closeModal: (state, action) => {
         const index = state.added.findIndex(modal => modal.type === action.payload.type);

         if (index !== -1) {
            return {
               ...state,
               added: [
                  ...state.added.slice(0, index),
                  { 
                     ...state.added[index],
                     visible: false 
                  },
                  ...state.added.slice(index + 1)
               ]
            };
         }

         return {
            ...state
         }
      }
   }
});

export const { openModal, closeModal } = modalSlice.actions;

export default modalSlice.reducer;