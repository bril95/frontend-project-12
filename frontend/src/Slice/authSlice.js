/* eslint-disable no-param-reassign */

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  token: null,
  isAuthorized: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthToken(state, { payload }) {
      state.token = payload;
    },
    setIsAuthorized(state, { payload }) {
      state.isAuthorized = payload;
    },
  },
});

export const { setAuthToken, setIsAuthorized } = authSlice.actions;
export const selectIsAuthorized = (state) => state.auth.isAuthorized;
export default authSlice.reducer;
