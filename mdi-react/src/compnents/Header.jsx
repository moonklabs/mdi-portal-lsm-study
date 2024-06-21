import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import AppBar from '@mui/material/AppBar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import { logout } from '../features/auth/authSlice';
import LoginModal from './modal/LoginModal';
import Signup from './modal/Signup';
import { savePanels } from '../features/panels/panelSlice';
import { styled } from '@mui/material';

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 3,
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
    window.location.reload();
  };

  const handleSave = () => {
    dispatch(savePanels(panels));
  };

  const handleLoginOpen = () => setLoginOpen(true);
  const handleLoginClose = () => setLoginOpen(false);

  const handleSignupOpen = () => setSignupOpen(true);
  const handleSignupClose = () => setSignupOpen(false);

  return (
    <Header position="static" component="header">
      <Box
        component="section"
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          pr: 0,
          height: '100%',
        }}
      >
        <Box sx={{ flexGrow: 1 }}>
          <img src="/logo/logo.svg" alt="mdi-portal-logo" />
        </Box>
        {isLoggedIn ? (
          <HeaderContentBox>
            <Typography variant="body1" component="span">
              {username}님 반갑습니다
            </Typography>

            <CenterBar />

            <Button color="inherit" onClick={handleLogout}>
              로그아웃
            </Button>

            <SaveBox color="inherit" onClick={handleSave}>
              <img
                src="/logo/ic_save.svg"
                alt="save"
                style={{
                  width: '2rem',
                  height: '2rem',
                }}
              />
            </SaveBox>
          </HeaderContentBox>
        ) : (
          <HeaderContentBox>
            <Button color="inherit" onClick={handleLoginOpen}>
              로그인
            </Button>

            <CenterBar />

            <Button
              color="inherit"
              onClick={handleSignupOpen}
              sx={{
                padding: '0 1rem',
              }}
            >
              회원가입
            </Button>
          </HeaderContentBox>
        )}
      </Box>
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
    </Header>
  );
}

export default HeaderComponent;

const Header = styled(AppBar)({
  background: 'linear-gradient(315deg, #3A3A3A 95%, #A8A8A8 104%)',
  color: '#fff',
  height: '3.5rem',
  overflow: 'hidden',
  display: 'flex',
  justifyContent: 'center',
  padding: '0 0 0 1rem',
});

const SaveBox = styled(Button)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: '#111',
  height: '100%',
  padding: '0 0.6rem',

  '&: hover': {
    backgroundColor: '#111',
  },
});

const HeaderContentBox = styled(Box)({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '1rem',
  height: '100%',
});

const CenterBar = styled(Box)({
  height: '1.5rem',
  width: '1px',
  backgroundColor: '#777777',
});
