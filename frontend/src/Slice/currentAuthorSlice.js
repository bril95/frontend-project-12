import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  author: null,
};

const currentAuthorSlice = createSlice({
  name: 'currentAuthor',
  initialState,
  reducers: {
    setCurrentAuthor(state, { payload }) {
    /* eslint-disable-next-line no-param-reassign */
      state.author = payload;
    },
  },
});

export const { setCurrentAuthor } = currentAuthorSlice.actions;
export const selectCurrentAuthor = (state) => state.currentAuthor.author;
export default currentAuthorSlice.reducer;
