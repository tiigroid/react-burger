import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { registerUser, loginUser, logoutUser, getUserData, updateUserData } from '../utils/api.ts';

export const register = createAsyncThunk('auth/register', registerUser);
export const login = createAsyncThunk('auth/login', loginUser);
export const logout = createAsyncThunk('auth/logout', logoutUser);
export const fetchUserData = createAsyncThunk('auth/fetchUserData', getUserData);
export const patchUserData = createAsyncThunk('auth/patchUserData', updateUserData);

const handleAsyncAction = (state) => {
  state.authLoading = true;
  state.authError = false;
};

const handleAsyncError = (state) => {
  state.authLoading = false;
  state.authError = true;
};

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    accessToken: document.cookie.match(new RegExp('(^| )' + 'accessToken' + '=([^;]+)'))?.[2] || '',
    refreshToken: document.cookie.match(new RegExp('(^| )' + 'refreshToken' + '=([^;]+)'))?.[2] || '',
    authLoading: false,
    authError: false,
    userData: {},
  },
  reducers: {
    clearAuthError: (state) => {
      state.authError = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => handleAsyncAction(state))
      .addCase(register.rejected, (state) => handleAsyncError(state))
      .addCase(register.fulfilled, (state, action) => {
        state.authLoading = false;
        if (action.payload.success) {
          state.userData = action.payload.user;
          state.accessToken = action.payload.accessToken.split('Bearer ')[1];
          state.refreshToken = action.payload.refreshToken;
          document.cookie = `accessToken=${state.accessToken}; path=/`;
          document.cookie = `refreshToken=${state.refreshToken}; max-age=${60 * 60 * 24 * 30}; path=/`;
        }
      });

    builder
      .addCase(login.pending, (state) => handleAsyncAction(state))
      .addCase(login.rejected, (state) => handleAsyncError(state))
      .addCase(login.fulfilled, (state, action) => {
        state.authLoading = false;
        if (action.payload.success) {
          state.userData = action.payload.user;
          state.accessToken = action.payload.accessToken.split('Bearer ')[1];
          state.refreshToken = action.payload.refreshToken;
          document.cookie = `accessToken=${state.accessToken}; path=/`;
          document.cookie = `refreshToken=${state.refreshToken};max-age=${60 * 60 * 24 * 30}; path=/`;
        }
      });

    builder
      .addCase(logout.pending, (state) => handleAsyncAction(state))
      .addCase(logout.rejected, (state) => handleAsyncError(state))
      .addCase(logout.fulfilled, (state, action) => {
        state.authLoading = false;
        if (action.payload.success) {
          state.userData = {};
          state.accessToken = '';
          state.refreshToken = '';
          document.cookie = `accessToken=; max-age=0; path=/`;
          document.cookie = `refreshToken=; max-age=0; path=/`;
        }
      });

    builder
      .addCase(fetchUserData.pending, (state) => handleAsyncAction(state))
      .addCase(fetchUserData.rejected, (state) => handleAsyncError(state))
      .addCase(fetchUserData.fulfilled, (state, action) => {
        state.authLoading = false;
        if (action.payload.success) {
          state.userData = action.payload.user;
        }
      });

    builder
      .addCase(patchUserData.pending, (state) => handleAsyncAction(state))
      .addCase(patchUserData.rejected, (state) => handleAsyncError(state))
      .addCase(patchUserData.fulfilled, (state, action) => {
        state.authLoading = false;
        if (action.payload.success) {
          state.userData = action.payload.user;
        }
      });
  },
});

export const { clearAuthError } = authSlice.actions;
export default authSlice.reducer;
