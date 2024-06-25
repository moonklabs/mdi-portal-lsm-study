import React, { useRef, useState } from 'react';
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
import { Snackbar, styled } from '@mui/material';
import { Text } from '../style/CommonStyled';

const HeaderComponent = ({ isLoggedIn, username }) => {
  const dispatch = useDispatch();
  const panels = useSelector((state) => state.panel);

  const [loginOpen, setLoginOpen] = useState(false);
  const [signupOpen, setSignupOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const saveBoxRef = useRef(null);

  const handleLogout = () => {
    dispatch(logout());
    window.location.reload();
  };

  const handleSave = () => {
    dispatch(savePanels(panels)).then(() => {
      setSnackbarOpen(true);
    });
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  const handleLoginOpen = () => setLoginOpen(true);
  const handleLoginClose = () => setLoginOpen(false);

  const handleSignupOpen = () => setSignupOpen(true);
  const handleSignupClose = () => setSignupOpen(false);

  return (
    <Header
      position="static"
      component="header"
      sx={{
        borderBottom: '1px solid #111',
      }}
    >
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
        <Box
          sx={{
            flexGrow: 1,
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <img src="/logo/logo.svg" alt="mdi-portal-logo" />
        </Box>
        {isLoggedIn ? (
          <HeaderContentBox>
            <Typography variant="body1" component="span" sx={Text}>
              {username}님 반갑습니다
            </Typography>

            <CenterBar />

            <Button color="inherit" onClick={handleLogout} sx={Text}>
              로그아웃
            </Button>
          </HeaderContentBox>
        ) : (
          <HeaderContentBox>
            <Button color="inherit" onClick={handleSignupOpen} sx={Text}>
              회원가입
            </Button>
            <CenterBar />
            <Button color="inherit" onClick={handleLoginOpen} sx={Text}>
              로그인
            </Button>
          </HeaderContentBox>
        )}
        <SaveBox color="inherit" onClick={handleSave} ref={saveBoxRef}>
          <img
            src="/logo/ic_save.svg"
            alt="save"
            style={{
              width: '2rem',
              height: '3rem',
            }}
          />
        </SaveBox>
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
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}
        message="패널이 성공적으로 저장되었습니다."
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        sx={{
          position: 'absolute',
          top: saveBoxRef.current
            ? saveBoxRef.current.getBoundingClientRect().bottom + 10
            : 'auto',
          left: saveBoxRef.current
            ? saveBoxRef.current.getBoundingClientRect().left
            : 'auto',
          transform: 'translateX(1.8rem) translateY(3.2rem)',
          '& .MuiSnackbarContent-root': {
            fontSize: '1.4rem',
            backgroundColor: '#333',
            color: '#fff',
          },
        }}
      />
    </Header>
  );
};

export default HeaderComponent;

const Header = styled(AppBar)({
  background: 'linear-gradient(315deg, #3A3A3A 98%, #A8A8A8 102%)',
  color: '#fff',
  height: '5rem',
  overflow: 'hidden',
  display: 'flex',
  justifyContent: 'center',
  padding: '0 0 0 2rem',
});

const SaveBox = styled(Button)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: '#111',
  height: '100%',
  width: '5rem',
  minWidth: 'auto',
  minHeight: 'auto',
  marginLeft: '2rem',

  '&: hover': {
    backgroundColor: '#111',
  },
});

const HeaderContentBox = styled(Box)({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '1.4rem',
  height: '100%',
});

const CenterBar = styled(Box)({
  height: '2rem',
  width: '1px',
  backgroundColor: '#777777',
});

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 360,
  height: 350,
  bgcolor: 'background.paper',
  boxShadow: 3,
  padding: '2.4rem',
  borderRadius: '0.4rem',
};
