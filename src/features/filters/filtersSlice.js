import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  categories: [],
  brands: [],
};

const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    updateFilters: (state, action) => {
      const { filterName, filterValue, changeType } = action.payload;
      switch (changeType) {
        case 'added':
          if (filterName === 'category') {
            return {
              ...state,
              categories: [...state.categories, filterValue],
            };
          }
          if (filterName === 'brand') {
            return {
              ...state,
              brands: [...state.brands, filterValue],
            };
          }
          return state;
        case 'removed':
          if (filterName === 'category') {
            return {
              ...state,
              categories: state.categories.filter((c) => c !== filterValue),
            };
          }
          if (filterName === 'brand') {
            return {
              ...state,
              brands: state.brands.filter((b) => b !== filterValue),
            };
          }
          return state;
        default:
          return state;
      }
    },
  },
});

export const { updateFilters } = filtersSlice.actions;
export default filtersSlice;
