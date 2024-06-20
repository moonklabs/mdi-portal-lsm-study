import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import { logout } from '../features/auth/authSlice';
import LoginModal from './modal/LoginModal';
import Signup from './modal/Signup';
import { savePanels } from '../features/panels/panelSlice';

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

function HeaderComponent() {
  const dispatch = useDispatch();
  const token = localStorage.getItem('token');
  const username = localStorage.getItem('username');
  const isLoggedIn = !!token;
  const panels = useSelector((state) => state.panel);

  const [loginOpen, setLoginOpen] = useState(false);
  const [signupOpen, setSignupOpen] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
  };

  const handleSave = () => {
    dispatch(savePanels(panels));
  };

  const handleLoginOpen = () => setLoginOpen(true);
  const handleLoginClose = () => setLoginOpen(false);

  const handleSignupOpen = () => setSignupOpen(true);
  const handleSignupClose = () => setSignupOpen(false);

  return (
    <AppBar position="static" component="header">
      <Toolbar component="section">
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          My Application
        </Typography>
        {isLoggedIn ? (
          <div>
            <Typography variant="body1" component="span" sx={{ mr: 2 }}>
              {username}님 반갑습니다
            </Typography>
            <Button color="inherit" onClick={handleLogout}>
              Logout
            </Button>
            <Button color="inherit" onClick={handleSave}>
              Save
            </Button>
          </div>
        ) : (
          <div>
            <Button color="inherit" onClick={handleLoginOpen}>
              Login
            </Button>
            <Button color="inherit" onClick={handleSignupOpen}>
              Sign Up
            </Button>
          </div>
        )}
      </Toolbar>
      <Modal open={loginOpen} onClose={handleLoginClose}>
        <Box sx={modalStyle}>
          <LoginModal onClose={handleLoginClose} />
        </Box>
      </Modal>
      <Modal open={signupOpen} onClose={handleSignupClose}>
        <Box sx={modalStyle}>
          <Signup onClose={handleSignupClose} />
        </Box>
      </Modal>
    </AppBar>
  );
}

export default HeaderComponent;
