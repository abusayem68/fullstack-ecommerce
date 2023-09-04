import { apiSlice } from '../api/apiSlice';

export const filtersApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCategories: builder.query({
      query: () => '/categories',
    }),
    getBrands: builder.query({
      query: () => '/brands',
    }),
  }),
});

export const { useGetCategoriesQuery, useGetBrandsQuery } = filtersApi;
