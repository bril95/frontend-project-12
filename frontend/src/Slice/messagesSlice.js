import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  messages: [],
};

const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    addMessage(state, { payload }) {
      /* eslint-disable-next-line no-param-reassign */
      state.messages = payload;
    },
  },
});

export const { addMessage } = messagesSlice.actions;
export default messagesSlice.reducer;
export const selectMessages = (state) => state.messages.messages;
