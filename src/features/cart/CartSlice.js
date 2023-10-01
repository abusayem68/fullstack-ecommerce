import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  products: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const isExistSelectedProduct = state.products.find(
        (product) => product.id === action.payload.id
      );
      if (isExistSelectedProduct) {
        state.products = state.products.map((product) => {
          if (product.id === action.payload.id) {
            return {
              ...product,
              quantity: product.quantity + 1,
            };
          }
          return product;
        });
      } else {
        state.products = [
          ...state.products,
          { ...action.payload, quantity: 1 },
        ];
      }
    },
    removeFromCart: (state, action) => {
      state.products = state.products.filter((p) => p.id !== action.payload);
    },
  },
});

export const { addToCart, removeFromCart } = cartSlice.actions;
export default cartSlice;
