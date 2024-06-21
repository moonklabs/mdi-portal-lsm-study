import { createTheme, ThemeProvider } from '@mui/material/styles';
import HeaderComponent from './compnents/Header';
import Window from './compnents/Window';
import TaskList from './compnents/TaskList';
import { Box } from '@mui/material';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { fetchPanels } from './features/panels/panelSlice';

function App() {
  const dispatch = useDispatch();
  const isLoggedIn = localStorage.getItem('token');

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(fetchPanels());
    }
  }, [dispatch, isLoggedIn]);

  const theme = createTheme({
    typography: {
      fontFamily: 'Pretendard, Arial, sans-serif',
    },
  });

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
        <Window />
        <TaskList />
      </Box>
    </ThemeProvider>
  );
}

export default App;
