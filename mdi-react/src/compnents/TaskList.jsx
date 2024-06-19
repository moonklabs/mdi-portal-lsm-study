// src/components/TaskList.js
import React, { useState } from 'react';
import {
  List,
  ListItem,
  ListItemText,
  Paper,
  Box,
  Button,
  Popover,
  MenuItem,
  ButtonGroup,
} from '@mui/material';

function TaskList() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [newWindowOpen, setNewWindowOpen] = useState(false);
  const handleMenuClick = (e) => {
    setAnchorEl(e.currentTarget);
  };


  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleAddPanel = () => {
    setNewWindowOpen(true);
    handleClose();
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <Box
      sx={{
        position: 'relative',
        bottom: 0,
        width: '100%',
        height: '3.4rem',
        bgcolor: 'background.paper',
        boxShadow: 3,
      }}
    >
      <Paper
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          height: '100%',
        }}
      >
        <Button variant="contained" color="primary" onClick={handleMenuClick}>
          메뉴
        </Button>
        <Popover
          id={id}
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
        >
          <MenuItem onClick={handleAddPanel}>새창만들기</MenuItem>
          <MenuItem
            onClick={() => {
              dispatch(arrangePanelsGrid());
              handleClose();
            }}
          >
            Grid 정렬
          </MenuItem>
          <MenuItem
            onClick={() => {
              dispatch(arrangePanelsStack());
              handleClose();
            }}
          >
            Stack 정렬
          </MenuItem>
          <MenuItem
            onClick={() => {
              dispatch(hideAllPanels());
              handleClose();
            }}
          >
            전체 숨기기
          </MenuItem>
          <MenuItem
            onClick={() => {
              dispatch(showAllPanels());
              handleClose();
            }}
          >
            전체 열기
          </MenuItem>
        </Popover>
      </Paper>
      <NewWindowForm
        open={newWindowOpen}
        onClose={() => setNewWindowOpen(false)}
      />
    </Box>
  );
}

export default TaskList;
