import { apiSlice } from '../api/apiSlice';
import { removeCartData } from '../cart/CartSlice';

export const orderApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getOrders: builder.query({
      query: () => '/orders',
      providesTags: ['Orders'],
    }),
    confirmOrder: builder.mutation({
      query: (data) => ({
        url: `/orders`,
        method: 'POST',
        body: data,
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const result = await queryFulfilled;
          console.log('success');
          dispatch(removeCartData());
        } catch (error) {
          // do nothing
        }
      },
      invalidatesTags: ['Orders'],
    }),
  }),
});

export const { useGetOrdersQuery, useConfirmOrderMutation } = orderApi;
