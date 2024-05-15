import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  channels: [],
  currentChannel: null,
};

const channelsSlice = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    setChannels(state, { payload }) {
      state.channels = payload;
    },
    setCurrentChannel(state, { payload }) {
      state.currentChannel = payload;
    },
    renameChannel(state, { payload }) {
      const index = state.channels.findIndex(channel => channel.id === payload.id);
      state.channels[index].name = payload.name;
    },
    deleteChannel(state, { payload }) {
      const index = state.channels.findIndex(channel => channel.id === payload.id);
      state.channels.splice(index, 1);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(deleteChannel, (state, { payload }) => {
        state.messages = state.messages.filter(message => message.channelId !== payload.id);
      })
  },
});

export const { setChannels, setCurrentChannel, renameChannel, deleteChannel } = channelsSlice.actions;
export const channelsReducer = channelsSlice.reducer; 
export default channelsSlice.reducer;
export const selectChannels = (state) => state.channels.channels;
export const selectCurrentChannel = (state) => state.channels.currentChannel;
