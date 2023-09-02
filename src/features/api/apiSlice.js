import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://locathost:9000',
  }),
  tagTypes: [],
  endpoints: (builder) => ({}),
});
