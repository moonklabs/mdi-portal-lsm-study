import { Box, Typography } from '@mui/material';

const PanelContent = ({ action, content, title, timezone, currentTime }) => {
  return (
    <Box
      sx={{
        height: '100%',
      }}
    >
      {action === 'browser' ? (
        <iframe
          src={content}
          title={title}
          style={{ width: '100%', height: '100%', border: 'none' }}
        />
      ) : action === 'clock' ? (
        <div>
          <div>{timezone}</div>
          <Typography variant="h4">{currentTime}</Typography>
        </div>
      ) : (
        <Typography variant="body1">Content goes here.</Typography>
      )}
    </Box>
  );
};

export default PanelContent;
