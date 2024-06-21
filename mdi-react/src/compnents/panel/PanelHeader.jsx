import { Box, Typography } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import { useDispatch } from 'react-redux';
import { updatePanel } from '../../features/panels/panelSlice';

const PanelHeader = ({ panel }) => {
  const dispatch = useDispatch();

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

  const handleMinimize = () => {
    dispatch(
      updatePanel({
        ...panel,
        isHide: !panel.isHide,
      })
    );
  };

  const handleClose = () => {
    dispatch(updatePanel({ ...panel, isClose: true }));
  };

  return (
    <header
      className="panel-header"
      style={{
        display: 'flex',
        alignItems: 'center',
        cursor: 'move',
        padding: '0.4rem 0.8rem',
        backgroundColor: '#3B3B3B',
        color: '#fff',
        borderRadius: '0.4rem 0.4rem 0 0',
      }}
    >
      <Typography sx={{ flexGrow: 1, fontSize: '1rem' }}>
        {panel.title}
      </Typography>
      <Box
        sx={{
          display: 'flex',
          gap: '0.4rem',
        }}
      >
        <IconButton size="small" onClick={handleMaximize}>
          <img src="/logo/ic_add.svg" alt="" />
        </IconButton>
        <IconButton size="small" onClick={handleMinimize}>
          <img src="/logo/ic_down.svg" alt="" />
        </IconButton>
        <IconButton size="small" onClick={handleClose}>
          <img src="/logo/ic_close_s.svg" alt="close" />
        </IconButton>
      </Box>
    </header>
  );
};

export default PanelHeader;
