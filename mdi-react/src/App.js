import { createTheme, ThemeProvider } from '@mui/material/styles';
import HeaderComponent from './compnents/Header';
import Window from './compnents/Window';
import TaskList from './compnents/TaskList';
import { Box } from '@mui/material';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { fetchPanels } from './features/panels/panelSlice';

const theme = createTheme();

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPanels());
  }, [dispatch]);

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
