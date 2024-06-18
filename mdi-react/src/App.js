// src/App.js
import React from 'react';
import { Button, Container, Typography } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Counter } from './features/counter/counter';

const theme = createTheme();

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Container>
        <Typography variant="h1" component="h2" gutterBottom>
          Welcome to MUI
        </Typography>
        <Button variant="contained" color="primary">
          Hello MUI
        </Button>
        <Counter variant="contained" />
      </Container>
    </ThemeProvider>
  );
}

export default App;
