import { createSlice } from '@reduxjs/toolkit';

const burgerConstructorSlice = createSlice({
  name: 'burger-constructor',
  initialState: {
    bun: '',
    inside: []
  },
  reducers: {
    setBun: (state, action) => {
      state.bun = action.payload;
    },
    addInside: (state, action) => {
      state.inside = [...state.inside, action.payload];
    },
    moveInside: (state, action) => {
      const { itemID, itemIndex, targetIndex } = action.payload;
      const newInside = [...state.inside.slice(0, itemIndex), ...state.inside.slice(itemIndex + 1)];
      newInside.splice(targetIndex, 0, itemID);
      state.inside = newInside;
    },
    deleteInside: (state, action) => {
      state.inside = state.inside.with(action.payload, null).filter(Boolean);
    },
    clearConstructor: (state) => {
      state.bun = '';
      state.inside = [];
    },
  }
});

export const { setBun, addInside, moveInside, deleteInside, clearConstructor } = burgerConstructorSlice.actions;
export default burgerConstructorSlice.reducer;