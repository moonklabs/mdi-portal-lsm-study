import { configureStore } from '@reduxjs/toolkit';
import panelReducer from '../features/panels/panelSlice';
import authReducer from '../features/auth/authSlice';

export const store = configureStore({
  reducer: {
    panel: panelReducer,
    auth: authReducer,
  },
});
