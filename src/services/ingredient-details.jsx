import { createSlice } from '@reduxjs/toolkit';

const ingredientDetailsSlice = createSlice({
  name: 'ingredient-details',
  initialState: {
    detailedIngredient: {},
    ingredientDetailsOpen: false
  },
  reducers: {
    setDetailedIngredient: (state, action) => {
      state.detailedIngredient = action.payload;
      state.ingredientDetailsOpen = true;
    },
    clearDetailedIngredient: (state) => {
      state.detailedIngredient = {};
    },
    setIngredientDetailsOpen: (state, action) => {
      state.ingredientDetailsOpen = action.payload;
    },
  },
});

export const { setDetailedIngredient, clearDetailedIngredient, setIngredientDetailsOpen } = ingredientDetailsSlice.actions;
export default ingredientDetailsSlice.reducer;