// categorySlice.js
import { createSlice } from '@reduxjs/toolkit';

const categorySlice = createSlice({
  name: 'categories',
  initialState: [],
  reducers: {
    addCategory: (state, action) => {
      state.push(action.payload);
    },
    removeCategory: (state, action) => {
    
    },
    updateCategory: (state, action) => {
      const { id, name } = action.payload;
      const categoryToUpdate = state.find((category) => category.id === id);
      if (categoryToUpdate) {
        categoryToUpdate.name = name;
      }
    },
  },
});

export const { addCategory, removeCategory, updateCategory } = categorySlice.actions;
export default categorySlice.reducer;
