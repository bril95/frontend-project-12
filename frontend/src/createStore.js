import { configureStore } from '@reduxjs/toolkit';
import { usersApi } from './usersApi.js';
import authReducer from './Slice/authSlice';
import channelsReducer from './Slice/channelsSlice.js';
import currentAuthorReducer from './Slice/currentAuthorSlice.js';
import messagesSlice from './Slice/messagesSlice.js';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [usersApi.reducerPath]: usersApi.reducer,
    channels: channelsReducer,
    currentAuthor: currentAuthorReducer,
    messages: messagesSlice,    
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(usersApi.middleware),
});