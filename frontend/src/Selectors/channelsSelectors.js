import { createSelector } from 'reselect';

const channelsStore = (state) => state.channels.channels;

export const selectDefaultChannel = createSelector(
  channelsStore,
  (channelsStore) => channelsStore.find((channel) => channel.name === 'general')
);

export const selectChannelsName = createSelector(
  channelsStore,
  (channelsStore) => channelsStore ? channelsStore.map((channel) => channel.name) : []
);