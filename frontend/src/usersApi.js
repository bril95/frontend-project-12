import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const usersApi = createApi({
  reducerPath: 'users',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api/v1/',
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.token;
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    addUser: builder.mutation({
      query: (user) => ({
        method: 'POST',
        body: user,
        url: '/signup',
      }),
    }),
    loginUser: builder.mutation({
      query: (user) => ({
        method: 'POST',
        body: user,
        url: '/login',
      }),
    }),
    getChannels: builder.query({
      query: () => '/channels',
    }),
  }),
});

export const {
  useAddUserMutation,
  useLoginUserMutation,
  useGetChannelsQuery,
} = usersApi;
