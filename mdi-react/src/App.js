// src/App.js
import React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import HeaderComponent from './compnents/Header';
import Window from './compnents/Window';
import TaskList from './compnents/TaskList';
import { Box } from '@mui/material';

const theme = createTheme();

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          height: '100vh',
        }}
      >
        <HeaderComponent />
        <Window></Window>
        <TaskList />
      </Box>
    </ThemeProvider>
  );
}

export default App;
