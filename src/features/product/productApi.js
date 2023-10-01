import { objectToQueryString } from '../../utils/utils';
import { apiSlice } from '../api/apiSlice';

export const productApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProductsByFilters: builder.query({
      query: ({ filter, sort, pagination }) => {
        let queryString = '';

        const filterQueryString = objectToQueryString(filter);

        const sortQueryString =
          sort._sort === ''
            ? ''
            : Object.entries(sort)
                .map(([key, value]) => `${key}=${value}`)
                .join('&');

        const paginationQueryString = Object.entries(pagination)
          .map(([key, value]) => `${key}=${value}`)
          .join('&');

        queryString = [
          filterQueryString,
          sortQueryString,
          paginationQueryString,
        ]
          .filter((item) => item.length > 0 && item !== '&')
          .join('&');

        return '/products?' + queryString;
      },
      transformResponse(apiResponse, meta) {
        return {
          products: apiResponse,
          totalCount: Number(meta.response.headers.get('X-Total-Count')),
        };
      },
    }),
    getProductById: builder.query({
      query: (id) => `/products/${id}`,
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
  useGetProductByIdQuery,
  useGetCategoriesQuery,
  useGetBrandsQuery,
} = productApi;
