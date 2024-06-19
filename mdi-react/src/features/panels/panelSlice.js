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
      const numPanels = state.length;
      const numCols = Math.ceil(Math.sqrt(numPanels));
      const numRows = Math.ceil(numPanels / numCols);
      const panelWidth = window.innerWidth / numCols;
      const panelHeight = window.innerHeight / numRows;

      console.log(numPanels, numCols, numRows, panelWidth, panelHeight)

      let leftOffset = 0;
      let topOffset = 0;
      let col = 0;

      state.forEach((panel) => {
        panel.width = panelWidth;
        panel.height = panelHeight;
        panel.x = leftOffset;
        panel.y = topOffset;

        col++;
        if (col >= numCols) {
          col = 0;
          leftOffset = 0;
          topOffset += panelHeight;
        } else {
          leftOffset += panelWidth;
        }
      });
    },
    arrangePanelsStack: (state) => {
      const stackOffset = 30;
      const mainWidth = window.innerWidth;
      const mainHeight = window.innerHeight;

      const panelWidth = mainWidth * 0.5;
      const panelHeight = mainHeight * 0.5;

      const startX = (mainWidth - panelWidth) / 2;
      const startY = (mainHeight - panelHeight) / 3;

      state.forEach((panel, index) => {
        panel.width = panelWidth;
        panel.height = panelHeight;
        panel.x = startX + index * stackOffset;
        panel.y = startY + index * stackOffset;
      });
    },
    hideAllPanels: (state) => {
      state.forEach((panel) => (panel.isHide = true));
    },
    showAllPanels: (state) => {
      state.forEach((panel) => (panel.isHide = false));
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
