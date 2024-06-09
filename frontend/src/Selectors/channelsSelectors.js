import { createSelector } from '@reduxjs/toolkit';

const channelsStore = (state) => state.channels.channels;

export const selectDefaultChannel = createSelector(
  channelsStore,
  (channels) => channels.find((channel) => channel.name === 'general')
);

export const selectChannelsName = createSelector(
  channelsStore,
  (channels) => channels ? channels.map((channel) => channel.name) : []
);
