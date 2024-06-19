// src/components/HeaderComponent.js
import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

function HeaderComponent() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('John Doe');

  const handleLogin = () => {
    setIsLoggedIn(true);
    setUsername('John Doe');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUsername('');
  };

  return (
    <AppBar position="static" component="header">
      <Toolbar component="section">
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          MDI PORTAL
        </Typography>
        {isLoggedIn ? (
          <Box>
            <Typography variant="body1" component="span" sx={{ mr: 2 }}>
              {username}님 반갑습니다
            </Typography>
            <Button color="inherit" onClick={handleLogout}>
              Logout
            </Button>
          </Box>
        ) : (
          <Box>
            <Button color="inherit" onClick={handleLogin}>
              Login
            </Button>
            <Button color="inherit">Sign Up</Button>
          </Box>
        )}
        <Button color="inherit">Save</Button>
      </Toolbar>
    </AppBar>
  );
}

export default HeaderComponent;
