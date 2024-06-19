import { configureStore } from '@reduxjs/toolkit';
import panelReducer from '../features/panels/panelSlice';

export const store = configureStore({
  reducer: {
    panel: panelReducer,
  },
});
