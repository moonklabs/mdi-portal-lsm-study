// src/components/Window.js
import React from 'react';
import { Container, Box } from '@mui/material';

function Window() {
  return (
    <Container
      component="main"
      maxWidth={false}
      disableGutters
      sx={{
        flex: '1 0 auto',
        overflow: 'hidden',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        padding: 0,
      }}
    >
      <Box
        sx={{
          position: 'relative',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexWrap: 'wrap',
        }}
      >
      </Box>
    </Container>
  );
}

export default Window;
