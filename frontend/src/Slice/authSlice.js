import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  token: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthToken(state, { payload }) {
      /* eslint-disable-next-line no-param-reassign */
      state.token = payload;
    },
  },
});

export const { setAuthToken } = authSlice.actions;
export default authSlice.reducer;
