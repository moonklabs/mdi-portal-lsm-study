import React, { useRef } from 'react';
import { useDispatch } from 'react-redux';
import Draggable from 'react-draggable';
import { Paper, Box } from '@mui/material';
import { bringToFront, updatePanel } from '../../features/panels/panelSlice';
import PanelHeader from './PanelHeader';
import useClock from '../../hooks/useClock';
import PanelContent from './PanelContent';

const Panel = ({ panel }) => {
  const dispatch = useDispatch();
  const panelRef = useRef(null);
  const currentTime = useClock(panel.timezone);

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

  const handleClick = () => {
    dispatch(bringToFront(panel.id));
  };

  return (
    <Draggable
      nodeRef={panelRef}
      handle=".panel-header"
      position={{ x: panel.x, y: panel.y }}
      onStart={handleDragStart}
      onStop={handleDragStop}
      onMouseDown={handleClick}
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
          <PanelHeader panel={panel} />
          <PanelContent {...panel} currentTime={currentTime} />
        </Paper>
      </Box>
    </Draggable>
  );
};

export default Panel;
