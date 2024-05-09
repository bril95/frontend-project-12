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
  },
});

export const { setChannels, setCurrentChannel } = channelsSlice.actions;
export const channelsReducer = channelsSlice.reducer; 
export default channelsSlice.reducer;
export const selectChannels = (state) => state.channels.channels;
export const selectCurrentChannel = (state) => state.channels.currentChannel;
