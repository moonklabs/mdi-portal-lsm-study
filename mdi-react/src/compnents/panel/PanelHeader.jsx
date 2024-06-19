import { Typography } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import MaximizeIcon from '@mui/icons-material/Maximize';
import MinimizeIcon from '@mui/icons-material/Minimize';

const PanelHeader = ({ title, isMaximized, handleMaximize, handleClose }) => {
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
        {title}
      </Typography>
      <IconButton size="small" onClick={handleMaximize}>
        {isMaximized ? <MinimizeIcon /> : <MaximizeIcon />}
      </IconButton>
      <IconButton size="small" onClick={handleClose}>
        <CloseIcon />
      </IconButton>
    </header>
  );
};

export default PanelHeader;
