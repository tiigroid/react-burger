import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { postIngredients } from '../utils/api';

export const getOrderData = createAsyncThunk(
  'order-details/postIngredients', 
  async (_, { getState }) => {
    const { burgerConstructor } = getState();
    const ingredients = burgerConstructor.inside;
    const bun = burgerConstructor.bun;
    const data = await postIngredients({ ingredients: [...ingredients.map(({itemID}) => itemID), bun] });
    return data;
  }
);

const orderDetailsSlice = createSlice({
  name: 'order-details',
  initialState: {
    order: {},
    loadingOrder: false,
    orderError: false,
    orderDetailsOpen: false
  },
  reducers: {
    clearOrderData: (state) => {
      state.order = {};
    },
    clearOrderError: (state) => {
      state.orderError = false;
    },
    setOrderDetailsOpen: (state, action) => {
      state.orderDetailsOpen = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getOrderData.pending, (state) => {
        state.loadingOrder = true;
        state.orderError = false;
      })
      .addCase(getOrderData.fulfilled, (state, action) => {
        state.loadingOrder = false;
        state.order = action.payload.order;
        state.orderDetailsOpen = true;
      })
      .addCase(getOrderData.rejected, (state) => {
        state.loadingOrder = false;
        state.orderError = true;
        state.order = {};
      });
  },
});

export const { setOrderDetailsOpen, clearOrderData, clearOrderError } = orderDetailsSlice.actions;
export default orderDetailsSlice.reducer;