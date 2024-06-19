import React, { useRef } from 'react';
import { useDispatch } from 'react-redux';
import Draggable from 'react-draggable';
import { Paper, Box } from '@mui/material';
import { updatePanel } from '../../features/panels/panelSlice';
import PanelHeader from './PanelHeader';
import useClock from '../../hooks/useClock';
import PanelContent from './PanelContent';

function Panel({ panel }) {
  const dispatch = useDispatch();
  const panelRef = useRef(null);
  const currentTime = useClock(panel.timezone);

  const handleMaximize = () => {
    dispatch(
      updatePanel({
        ...panel,
        isMaximized: !panel.isMaximized,
        x: 0,
        y: 0,
        width: window.innerWidth,
        height: window.innerHeight,
      })
    );
  };

  const handleClose = () => {
    dispatch(updatePanel({ ...panel, isClose: true }));
  };

  const handleDragStart = () => {
    dispatch(
      updatePanel({
        ...panel,
        isMaximized: false,
      })
    );
  };

  const handleDragStop = (e, data) => {
    dispatch(updatePanel({ ...panel, x: data.x, y: data.y }));
  };

  return (
    <Draggable
      nodeRef={panelRef}
      handle=".panel-header"
      position={{ x: panel.x, y: panel.y }}
      onStart={handleDragStart}
      onStop={handleDragStop}
    >
      <Box
        ref={panelRef}
        sx={{
          position: 'absolute',
          zIndex: 1000,
          width: panel.width,
          height: panel.height,
        }}
      >
        <Paper
          component="section"
          elevation={3}
          sx={{
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <PanelHeader
            title={panel.title}
            isMaximized={panel.isMaximized}
            handleMaximize={handleMaximize}
            handleClose={handleClose}
          />
          <PanelContent {...panel} currentTime={currentTime} />
        </Paper>
      </Box>
    </Draggable>
  );
}

export default Panel;
