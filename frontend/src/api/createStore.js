import { configureStore } from '@reduxjs/toolkit';
import { usersApi } from './usersApi.js';
import authReducer from '../Slice/authSlice.js';
import channelsSliceReducer from '../Slice/channelsSlice.js';
import currentAuthorReducer from '../Slice/currentAuthorSlice.js';
import messagesSlice from '../Slice/messagesSlice.js';

export default configureStore({
  reducer: {
    auth: authReducer,
    [usersApi.reducerPath]: usersApi.reducer,
    channels: channelsSliceReducer,
    currentAuthor: currentAuthorReducer,
    messages: messagesSlice,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(usersApi.middleware),
});
