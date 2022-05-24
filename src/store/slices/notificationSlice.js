import { createSlice } from '@reduxjs/toolkit';

const initialState = {
   connectionId: null,
   messages: []
};

export const notificationSlice = createSlice({
   name: 'notification',
   initialState,
   reducers: {
      setConnectionId: (state, action) => {
         return {
            ...state,
            ...action.payload
         }
      },
      addMessage: (state, action) => {
         return {
            ...state,
            messages: [...state.messages, action.payload]
         };
      }
   }
});

export const { setConnectionId, addMessage } = notificationSlice.actions;

export default notificationSlice.reducer;