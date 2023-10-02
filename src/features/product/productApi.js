import { objectToQueryString } from '../../utils/utils';
import { apiSlice } from '../api/apiSlice';

export const productApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllProducts: builder.query({
      query: () => '/products',
      providesTags: ['Products'],
    }),
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
      keepUnusedDataFor: 400,
      transformResponse(apiResponse, meta) {
        return {
          products: apiResponse,
          totalCount: Number(meta.response.headers.get('X-Total-Count')),
        };
      },
    }),
    getProductById: builder.query({
      query: (id) => `/products/${id}`,
      providesTags: (result, error, arg) => [{ type: 'Product', id: arg }],
    }),
    getCategories: builder.query({
      query: () => '/categories',
    }),
    getBrands: builder.query({
      query: () => '/brands',
    }),
    addProduct: builder.mutation({
      query: (data) => ({
        url: `/products`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Products'],
    }),
    update: builder.mutation({
      query: ({ id, data }) => ({
        url: `/products/${id}`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: (result, error, arg) => [
        'Products',
        { type: 'Product', id: arg.id },
      ],
    }),
    deleteProduct: builder.mutation({
      query: (id) => ({
        url: `/products/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Products'],
    }),
  }),
});

export const {
  useGetAllProductsQuery,
  useGetProductsByFiltersQuery,
  useGetProductByIdQuery,
  useGetCategoriesQuery,
  useGetBrandsQuery,
  useAddProductMutation,
  useUpdateMutation,
  useDeleteProductMutation,
} = productApi;
