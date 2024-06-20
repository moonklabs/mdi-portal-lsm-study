// src/components/TaskList.js
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
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
  styled,
} from '@mui/material';
import {
  arrangePanelsGrid,
  arrangePanelsStack,
  hideAllPanels,
  showAllPanels,
  updatePanel,
} from '../features/panels/panelSlice';
import NewWindowForm from './modal/NewWindowForm';

function TaskList() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [newWindowOpen, setNewWindowOpen] = useState(false);
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.panel);

  const taskList = tasks
    .filter((task) => !task.isClose)
    .sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));

  const handleMenuClick = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handleTaskClick = (task) => {
    dispatch(updatePanel({ ...task, isHide: !task.isHide }));
    console.log(task);
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
        <List sx={{ display: 'flex', padding: '0' }}>
          <ListItem
            sx={{
              width: 'auto',
              borderRight: '1px solid #E1E1E1',
            }}
          >
            <ListItemText
              primary="시작"
              primaryTypographyProps={{
                sx: { color: '#515151', fontWeight: '700' },
              }}
            />
          </ListItem>
          {taskList.map((task) => (
            <ButtonGroup key={task.id} sx={{ width: 'auto' }}>
              <TaskMenuButton onClick={() => handleTaskClick(task)}>
                {task.title}
              </TaskMenuButton>
            </ButtonGroup>
          ))}
        </List>
        <TaskMenuButton
          onClick={handleMenuClick}
          sx={{
            borderRight: 'none',
            borderLeft: '1px solid #E1E1E1',
          }}
        >
          메뉴
        </TaskMenuButton>
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

const TaskMenuButton = styled(Button)({
  borderRadius: 0,
  border: 'none',
  borderRight: '1px solid #E1E1E1',
  color: '#3A3A3A',
});
