import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// 회원가입 Thunk
export const signUp = createAsyncThunk(
  'auth/signUp',
  async (authCredentials, thunkAPI) => {
    try {
      const response = await axios.post(
        'http://localhost:4000/api/auth/signup',
        authCredentials
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

// 로그인 Thunk
export const signIn = createAsyncThunk(
  'auth/signIn',
  async (authCredentials, thunkAPI) => {
    try {
      const response = await axios.post(
        'http://localhost:4000/api/auth/signin',
        authCredentials
      );
      localStorage.setItem('token', response.data.accessToken);
      localStorage.setItem('username', authCredentials.username);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    token: null,
    loading: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem('token');
      localStorage.removeItem('username');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signUp.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signUp.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(signUp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(signIn.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signIn.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.accessToken;
      })
      .addCase(signIn.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
