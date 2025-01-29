import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getIngredients } from '../utils/api';

export const fetchIngredients = createAsyncThunk(
  "burger-ingredients/fetchIngredients",
  getIngredients
);

const burgerIngredientsSlice = createSlice({
  name: 'burger-ingredients',
  initialState: {
    data: JSON.parse(sessionStorage.getItem('data')) || [],
    loadingData: false,
    loadingError: false
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchIngredients.pending, (state) => {
        state.loadingData = true;
        state.loadingError = false;
      })
      .addCase(fetchIngredients.fulfilled, (state, action) => {
        state.loadingData = false;
        state.data = action.payload.data;
        sessionStorage.setItem('data', JSON.stringify(action.payload.data));
      })
      .addCase(fetchIngredients.rejected, (state) => {
        state.loadingData = false;
        state.loadingError = true;
        state.data = [];
      });
  },
});

export default burgerIngredientsSlice.reducer;
