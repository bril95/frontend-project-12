import socket from './socketConfig';
import { addMessage } from '../Slice/messagesSlice';

const socketMiddleware = (store) => {
  socket.on('newMessage', (payload) => {
    store.dispatch(addMessage(payload));
  });

  return (next) => (action) => next(action);
};

export default socketMiddleware;