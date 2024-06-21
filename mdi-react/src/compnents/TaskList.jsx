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
        height: '4.1rem',
        bgcolor: 'background.paper',
        borderTop: '1px solid #DBDBDB',
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
              width: '5.5rem',
              borderRight: '1px solid #E1E1E1',
              padding: '0',
            }}
          >
            <ListItemText
              primary="시작"
              primaryTypographyProps={{
                sx: {
                  color: '3A3A3A',
                  fontWeight: '700',
                  fontSize: '1.4rem',
                  textAlign: 'center',
                },
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
            fontSize: '1.4rem',
            fontWeight: '700',
            border: 'none',
            color: '#3A3A3A',
            borderLeft: '1px solid #E1E1E1',
            width: '5.5rem',
            minWidth: 'auto',
            minHeight: 'auto',

            '&:hover': {
              border: 'none',
              backgroundColor: '#F1F4FD',
              borderLeft: '1px solid #E1E1E1',
            },
          }}
        >
          메뉴
        </TaskMenuButton>
        <Popover
          id={id}
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          component="section"
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
          transformOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          sx={{
            '& .MuiPopover-paper': {
              boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
              borderRadius: '8px 0 0 0',
              width: '16rem',
              height: '20rem',
              marginLeft: '1.6rem',
            },
            '& .MuiMenuItem-root': {
              width: '100%',
              borderBottom: '1px solid #E1E1E1',
              '&:hover': {
                backgroundColor: '#F1F4FD',
              },
            },
            '& .MuiMenuItem-root:last-child': {
              width: '100%',
              borderBottom: 'none',
            },
          }}
        >
          <PopoverMunu onClick={handleAddPanel}>새로운 윈도우</PopoverMunu>
          <PopoverMunu
            onClick={() => {
              dispatch(hideAllPanels());
              handleClose();
            }}
          >
            모두 최소화
          </PopoverMunu>
          <PopoverMunu
            onClick={() => {
              dispatch(showAllPanels());
              handleClose();
            }}
          >
            전체 열기
          </PopoverMunu>
          <PopoverMunu
            onClick={() => {
              dispatch(arrangePanelsGrid());
              handleClose();
            }}
          >
            바둑판 정렬
          </PopoverMunu>
          <PopoverMunu
            onClick={() => {
              dispatch(arrangePanelsStack());
              handleClose();
            }}
          >
            스택 정렬
          </PopoverMunu>
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
  fontSize: '1.4rem',
  fontWeight: '400',
  borderRight: '1px solid #E1E1E1',
  color: '#3A3A3A',
  textTransform: 'none',

  '&:hover': {
    backgroundColor: '#F1F4FD',
    border: 'none',
    borderRight: '1px solid #E1E1E1',
  },
});

const PopoverMunu = styled(MenuItem)({
  width: '100%',
  borderBottom: '1px solid #E1E1E1',
  fontSize: '1.4rem',
  lineHeight: '1.6rem',
  fontWeight: '400',
  height: '4rem',

  '&:hover': {
    backgroundColor: '#F1F4FD',
  },
});
