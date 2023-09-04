import { apiSlice } from '../api/apiSlice';

export const productListApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: (filteredBy) => {
        const { categories, brands } = filteredBy || {};

        const categoriesStr =
          categories.length > 0
            ? categories
                .map((category) => `category_like=${category}`)
                .join('&')
            : '';
        const brandsStr =
          brands.length > 0
            ? brands.map((brand) => `brand_like=${brand}`).join('&')
            : '';
        const queryString =
          brandsStr.length > 0 || categoriesStr.length > 0
            ? `?${categoriesStr}${brandsStr ? '&' + brandsStr : ''}`
            : '';
        return `/products${queryString}`;
      },
    }),
  }),
});

export const { useGetProductsQuery } = productListApi;
