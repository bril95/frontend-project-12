import { createSlice } from '@reduxjs/toolkit';
import { deleteChannel } from './channelsSlice';

const initialState = {
  messages: [],
};

const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    addMessage(state, { payload }) {
      state.messages = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(deleteChannel, (state, { payload }) => {
        state.messages = state.messages.filter((message) => message.channelId !== payload.id);
      });
  },
});

export const { addMessage } = messagesSlice.actions;
export default messagesSlice.reducer;
export const selectMessages = (state) => state.messages.messages;
