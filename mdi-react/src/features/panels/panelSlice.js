import { createSlice } from '@reduxjs/toolkit';

const initialState = [];

export const panelSlice = createSlice({
  name: 'panels',
  initialState,
  reducers: {
    addPanel: (state, action) => {
      console.log(state, action);
      state.push(action.payload);
    },
    updatePanel: (state, action) => {
      const index = state.findIndex((panel) => panel.id === action.payload.id);
      if (index !== -1) {
        state[index] = action.payload;
      }
    },
    arrangePanelsGrid: (state) => {
      // 그리드 정렬
    },
    arrangePanelsStack: (state) => {
      // 스택 정렬
    },
    hideAllPanels: (state) => {
      state.forEach((panel) => (panel.isHidden = true));
    },
    showAllPanels: (state) => {
      state.forEach((panel) => (panel.isHidden = false));
    },
  },
});

export const {
  addPanel,
  updatePanel,
  arrangePanelsGrid,
  arrangePanelsStack,
  hideAllPanels,
  showAllPanels,
} = panelSlice.actions;

export default panelSlice.reducer;
