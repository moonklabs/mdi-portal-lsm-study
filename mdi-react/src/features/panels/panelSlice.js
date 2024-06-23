import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const savePanels = createAsyncThunk(
  'panels/savePanel',
  async (panels, thunkAPI) => {
    try {
      const response = await axios.post(
        'http://localhost:4000/api/panels/save',
        panels,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const fetchPanels = createAsyncThunk(
  'panels/fetchPanels',
  async (_, thunkAPI) => {
    try {
      const response = await axios.get('http://localhost:4000/api/panels', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      response.data.sort((a, b) => a.order - b.order);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const panelSlice = createSlice({
  name: 'panels',
  initialState: [],
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
    bringToFront: (state, action) => {
      const index = state.findIndex((panel) => panel.id === action.payload);
      if (index !== -1) {
        const [panel] = state.splice(index, 1);
        state.push(panel);

        state.forEach((panel, index) => {
          console.log(panel.order);
          panel.order = index;
        });
      }
    },
    arrangePanelsGrid: (state) => {
      const numPanels = state.length;
      const numCols = Math.ceil(Math.sqrt(numPanels));
      const numRows = Math.ceil(numPanels / numCols);
      const panelWidth = window.innerWidth / numCols;
      const panelHeight = (window.innerHeight - 90) / numRows;

      console.log(numPanels, numCols, numRows, panelWidth, panelHeight);

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
      const stackOffset = 20;
      const mainWidth = window.innerWidth;
      const mainHeight = window.innerHeight;

      const panelWidth = mainWidth * 0.5;
      const panelHeight = mainHeight * 0.5;

      const startX = (mainWidth - panelWidth) / 4;
      const startY = (mainHeight - panelHeight) / 4;

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
  extraReducers: (builder) => {
    builder.addCase(savePanels.fulfilled, (state, action) => {
      return action.payload;
    });
    builder.addCase(savePanels.rejected, (state, action) => {
      console.error('패널 저장 실패:', action.payload);
    });
    builder.addCase(fetchPanels.fulfilled, (state, action) => {
      return action.payload;
    });
    builder.addCase(fetchPanels.rejected, (state, action) => {
      console.error('패널 불러오기 실패:', action.payload);
    });
  },
});

export const {
  addPanel,
  updatePanel,
  bringToFront,
  arrangePanelsGrid,
  arrangePanelsStack,
  hideAllPanels,
  showAllPanels,
} = panelSlice.actions;

export default panelSlice.reducer;
