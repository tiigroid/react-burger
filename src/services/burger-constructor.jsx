import { createSlice } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

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
    addInside: {
      reducer: (state, action) => {
        state.inside = [...state.inside, action.payload];
      },
      prepare: (itemID) => {
        return { payload: { itemID, uniqueID: uuidv4() }}
      },
    },
    moveInside: (state, action) => {
      const { uniqueID, itemID, itemIndex, targetIndex } = action.payload;
      const newInside = [...state.inside.slice(0, itemIndex), ...state.inside.slice(itemIndex + 1)];
      newInside.splice(targetIndex, 0, {uniqueID, itemID});
      state.inside = newInside;
    },
    deleteInside: (state, action) => {
      state.inside = state.inside.with(action.payload, null).filter(Boolean);
    },
    clearConstructor: (state, action) => {
      state.bun = '';
      state.inside = [];
    },
  }
});

export const { setBun, addInside, moveInside, deleteInside, clearConstructor } = burgerConstructorSlice.actions;
export default burgerConstructorSlice.reducer;