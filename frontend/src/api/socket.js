import { io } from 'socket.io-client';
import { addMessage } from '../Slice/messagesSlice';
import { setChannels, renameChannel, deleteChannel } from '../Slice/channelsSlice';

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

  const handleRenameChannel = (channel) => {
    dispatch(renameChannel(channel));
  }

  const handleRemoveChannel = ({ id }) => {
    dispatch(deleteChannel(id))
  }

  socket.on('newMessage', handleMessage);
  socket.on('newChannel', handleNewChannel);
  socket.on('renameChannel', handleRenameChannel);
  socket.on('removeChannel', handleRemoveChannel);

  return () => {
    socket.off('newMessage', handleMessage);
    socket.off('newChannel', handleNewChannel);
    socket.off('renameChannel', handleRenameChannel);
    socket.off('removeChannel', handleRemoveChannel);
  };
};

export default handleSocketEvents;
