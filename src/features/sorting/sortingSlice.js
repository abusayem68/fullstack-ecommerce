import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  sortType: 'default',
};

const sortingSlice = createSlice({
  name: 'sorting',
  initialState,
  reducers: {
    updateSortType: (state, action) => {
      return {
        ...state,
        sortType: action.payload,
      };
    },
  },
});

export const { updateSortType } = sortingSlice.actions;
export default sortingSlice;
