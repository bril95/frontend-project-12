/* eslint-disable no-param-reassign */

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  username: null,
};

const usernameSlice = createSlice({
  name: 'username',
  initialState,
  reducers: {
    setCurrentUsername(state, { payload }) {
      state.username = payload;
    },
  },
});

export const { setCurrentUsername } = usernameSlice.actions;
export const selectCurrentUsername = (state) => state.username.username;
export default usernameSlice.reducer;
