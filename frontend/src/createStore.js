import { configureStore } from '@reduxjs/toolkit';
import { usersApi } from './usersApi.js';
import authReducer from './Slice/authSlice';
import channelsReducer from './Slice/channelsSlice.js';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [usersApi.reducerPath]: usersApi.reducer,
    channels: channelsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(usersApi.middleware),
});