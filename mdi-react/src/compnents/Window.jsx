// src/components/Window.js
import React from 'react';
import { Container, Box } from '@mui/material';
import { useSelector } from 'react-redux';
import Panel from './panel/Panel';

function Window() {
  const panels = useSelector((state) => state.panel);

  const panelList = panels.filter(
    (task) => task.isClose === false && task.isHide === false
  );

  console.log(panelList);

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
        {panelList &&
          panelList.map((panel) => <Panel key={panel.id} panel={panel} />)}
      </Box>
    </Container>
  );
}

export default Window;
