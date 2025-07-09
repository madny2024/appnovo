import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  categories: [],
  streams: [],
  selectedCategory: null,
  contentType: 'live', // 'live', 'movie', 'series'
  status: 'idle', // 'idle', 'loading', 'succeeded', 'failed'
};

const contentSlice = createSlice({
  name: 'content',
  initialState,
  reducers: {
    setContentType: (state, action) => {
      state.contentType = action.payload;
      state.selectedCategory = null; // Reseta a categoria ao mudar o tipo
      state.streams = [];
    },
    setSelectedCategory: (state, action) => {
      state.selectedCategory = action.payload;
    },
  },
});

export const { setContentType, setSelectedCategory } = contentSlice.actions;

export default contentSlice.reducer;