import { apiSlice } from '../api/apiSlice';

export const orderApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getOrders: builder.query({
      query: () => '/orders',
    }),
    confirmOrder: builder.mutation({
      query: (data) => ({
        url: `/orders`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Orders'],
    }),
  }),
});

export const { useGetOrdersQuery, useConfirmOrderMutation } = orderApi;
