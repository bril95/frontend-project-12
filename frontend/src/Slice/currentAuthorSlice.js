import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  author: null,
};

const currentAuthorSlice = createSlice({
  name: 'currentAuthor',
  initialState,
  reducers: {
    setCurrentAuthor(state, { payload }) {
      state.author = payload;
    },
  },
});

export const { setCurrentAuthor } = currentAuthorSlice.actions;
export default currentAuthorSlice.reducer;
export const selectCurrentAuthor = (state) => state.currentAuthor.author;