import { Typography } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import MaximizeIcon from '@mui/icons-material/Maximize';
import MinimizeIcon from '@mui/icons-material/Minimize';
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
        padding: '4px',
      }}
    >
      <Typography variant="h6" sx={{ flexGrow: 1 }}>
        {panel.title}
      </Typography>
      <IconButton size="small" onClick={handleMaximize}>
        {panel.isMaximized ? <MinimizeIcon /> : <MaximizeIcon />}
      </IconButton>
      <IconButton size="small" onClick={handleClose}>
        <CloseIcon />
      </IconButton>
    </header>
  );
};

export default PanelHeader;
