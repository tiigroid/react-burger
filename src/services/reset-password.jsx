import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { requestResetPassword, resetPassword } from '../utils/api';

export const sendEmailForPassword = createAsyncThunk('auth/sendEmailForPassword', requestResetPassword);
export const sendNewPassword = createAsyncThunk('auth/sendNewPassword', resetPassword);

const passwordSlice = createSlice({
  name: 'password',
  initialState: {
    resetEmailSent: false,
    passwordResetSuccess: false,
    resetLoading: false,
    resetError: false,
  },
  reducers: {
    clearResetError: (state) => {
      state.resetError = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendEmailForPassword.pending, (state) => {
        state.resetLoading = true;
        state.resetError = false;
      })
      .addCase(sendEmailForPassword.fulfilled, (state, action) => {
        state.resetLoading = false;
        if (action.payload.success) {
          state.resetEmailSent = true;
        } else {
          state.resetError = true;
        }
      })
      .addCase(sendEmailForPassword.rejected, (state) => {
        state.resetLoading = false;
        state.resetError = true;
      });


    builder
      .addCase(sendNewPassword.pending, (state) => {
        state.resetLoading = true;
        state.resetError = false;
      })
      .addCase(sendNewPassword.fulfilled, (state, action) => {
        state.resetLoading = false;
        if (action.payload.success) {
          state.passwordResetSuccess = true;
        } else {
          state.resetError = true;
        }
      })
      .addCase(sendNewPassword.rejected, (state) => {
        state.resetLoading = false;
        state.resetError = true;
      });
  },
});

export const { clearResetError } = passwordSlice.actions;
export default passwordSlice.reducer;

