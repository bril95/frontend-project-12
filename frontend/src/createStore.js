import { configureStore } from '@reduxjs/toolkit';
import { usersApi } from './usersApi.js';
import authReducer from './Slice/authSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [usersApi.reducerPath]: usersApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(usersApi.middleware),
});