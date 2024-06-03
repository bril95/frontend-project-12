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
      /* eslint-disable-next-line no-param-reassign */
      state.token = payload;
    },
    setIsAuthorized(state, { payload }) {
      /* eslint-disable-next-line no-param-reassign */
      state.isAuthorized = payload;
    },
  },
});

export const { setAuthToken, setIsAuthorized } = authSlice.actions;
export const selectIsAuthorized = (state) => state.auth.isAuthorized;
export default authSlice.reducer;
