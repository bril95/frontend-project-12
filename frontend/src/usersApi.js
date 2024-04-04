import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const usersApi = createApi({
  reducerPath: 'users',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api/v1/login',
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.token;
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    addUser: builder.mutation({
      query: (user) => ({
        method: 'POST',
        body: user,
      }),
      baseUrl: '/signup',
    }),
    loginUser: builder.mutation({
      query: (user) => ({
        method: 'POST',
        body: user,
      }),
      baseUrl: '/api/v1/login',
    })
  }),
});

export const {
  useAddUserMutation,
  useLoginUserMutation,
} = usersApi;
