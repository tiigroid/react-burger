import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getIngredients } from '../utils/api';

export const fetchIngredients = createAsyncThunk(
  'burger-ingredients/fetchIngredients', 
  async (_, { rejectWithValue }) => {
    try {
      const data = await getIngredients();
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const burgerIngredientsSlice = createSlice({
  name: 'burger-ingredients',
  initialState: {
    data: [],
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
      })
      .addCase(fetchIngredients.rejected, (state) => {
        state.loadingData = false;
        state.loadingError = true;
        state.data = [];
      });
  },
});

export default burgerIngredientsSlice.reducer;
