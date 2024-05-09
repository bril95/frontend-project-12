import { io } from 'socket.io-client';
import { addMessage } from './Slice/messagesSlice';
import { setChannels } from './Slice/channelsSlice';

const socket = io();

const handleSocketEvents = (dispatch, channelsStore, messagesStore) => {
  const handleMessage = (message) => {
    const newMessage = [...messagesStore, message];
    dispatch(addMessage(newMessage));
  };

  const handleNewChannel = (channel) => {
    const newStore = [...channelsStore, channel];
    dispatch(setChannels(newStore));
  };

  socket.on('newMessage', handleMessage);
  socket.on('newChannel', handleNewChannel);

  return () => {
    socket.off('newMessage', handleMessage);
    socket.off('newChannel', handleNewChannel);
  };
};

export default handleSocketEvents;
