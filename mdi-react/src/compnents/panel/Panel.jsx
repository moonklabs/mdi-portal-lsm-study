import React, { useRef, useState } from 'react';
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
  const [transform, setTransform] = useState({ x: panel.x, y: panel.y });

  const handleMaximize = () => {
    const isMaximized = !panel.isMaximized;
    setTransform({ x: 0, y: 0 });
    dispatch(
      updatePanel({
        ...panel,
        isMaximized,
        x: 0,
        y: 0,
        width: isMaximized ? window.innerWidth : panel.width,
        height: isMaximized ? window.innerHeight : panel.height,
      })
    );
  };

  const handleClose = () => {
    dispatch(updatePanel({ ...panel, isClose: true }));
  };

  return (
    <Draggable
      nodeRef={panelRef}
      handle=".panel-header"
      position={transform}
      onStop={(e, data) => {
        if (!panel.isMaximized) {
          setTransform({ x: data.x, y: data.y });
          dispatch(updatePanel({ ...panel, x: data.x, y: data.y }));
        }
      }}
    >
      <Box
        ref={panelRef}
        sx={{
          position: 'absolute',
          zIndex: 1000,
          transform: `translate(${transform.x}px, ${transform.y}px)`,
          width: panel.isMaximized ? '100%' : panel.width,
          height: panel.isMaximized ? '100%' : panel.height,
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
