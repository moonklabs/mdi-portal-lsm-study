import { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { Rnd } from 'react-rnd';
import { Paper, Box } from '@mui/material';
import { bringToFront, updatePanel } from '../../features/panels/panelSlice';
import PanelHeader from './PanelHeader';
import useClock from '../../hooks/useClock';
import PanelContent from './PanelContent';

const Panel = ({ panel }) => {
  const dispatch = useDispatch();
  const panelRef = useRef(null);
  const currentTime = useClock(panel.timezone);

  const handleDragStop = (e, data) => {
    dispatch(updatePanel({ ...panel, x: data.x, y: data.y }));
  };

  const handleResizeStop = (e, direction, ref, delta, position) => {
    const width = parseFloat(ref.style.width);
    const height = parseFloat(ref.style.height);
    if (!isNaN(width) && !isNaN(height)) {
      dispatch(
        updatePanel({
          ...panel,
          width,
          height,
          x: position.x,
          y: position.y,
        })
      );
    }
  };
  const handleClick = () => {
    dispatch(bringToFront(panel.id));
  };

  return (
    <Rnd
      size={{ width: panel.width, height: panel.height }}
      position={{ x: panel.x, y: panel.y }}
      onDragStop={handleDragStop}
      onResizeStop={handleResizeStop}
      onMouseDown={handleClick}
      minWidth={100}
      minHeight={100}
      bounds="parent"
    >
      <Box
        ref={panelRef}
        sx={{
          width: '100%',
          height: '100%',
        }}
      >
        <Paper
          component="section"
          sx={{
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            boxShadow: '0px 2px 2px 0px #C7C7C752, 0px 9px 6px 0px #A7A7A72E',
          }}
        >
          <PanelHeader panel={panel} />
          <PanelContent {...panel} currentTime={currentTime} />
        </Paper>
      </Box>
    </Rnd>
  );
};

export default Panel;
