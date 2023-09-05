import { objectToQueryString } from '../../utils/utils';
import { apiSlice } from '../api/apiSlice';

export const productApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProductsByFilters: builder.query({
      query: ({ filter, sort }) => {
        let queryString = '';
        queryString += objectToQueryString(filter);

        const sortQueryString = Object.entries(sort)
          .map(([key, value]) => `${key}=${value}`)
          .join('&');

        queryString += sortQueryString ? `&${sortQueryString}` : '';

        return '/products?' + queryString;
      },
    }),
    getCategories: builder.query({
      query: () => '/categories',
    }),
    getBrands: builder.query({
      query: () => '/brands',
    }),
  }),
});

export const {
  useGetProductsByFiltersQuery,
  useGetCategoriesQuery,
  useGetBrandsQuery,
} = productApi;
