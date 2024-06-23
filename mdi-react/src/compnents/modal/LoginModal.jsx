import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Typography, Alert, Stack } from '@mui/material';
import { signIn } from '../../features/auth/authSlice';
import {
  FormFieldTitle,
  FormSubmitButton,
  FormTextBox,
  FormTextField,
} from '../../style/FormStyled';
import { CloseBox, HeaderText } from '../../style/CommonStyled';

const LoginModal = ({ onClose }) => {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);
  const [usernameLabelHidden, setUsernameLabelHidden] = useState(false);
  const [passwordLabelHidden, setPasswordLabelHidden] = useState(false);

  const handleFocus = (field) => {
    if (field === 'username') {
      setUsernameLabelHidden(true);
    } else if (field === 'password') {
      setPasswordLabelHidden(true);
    }
  };

  const handleBlur = (field) => {
    if (field === 'username' && formData.username === '') {
      setUsernameLabelHidden(false);
    } else if (field === 'password' && formData.password === '') {
      setPasswordLabelHidden(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(signIn(formData)).then((result) => {
      if (signIn.fulfilled.match(result)) {
        window.location.reload();
        onClose();
      }
    });
  };

  return (
    <Stack
      component="form"
      onSubmit={handleSubmit}
      sx={{
        height: '100%',
      }}
    >
      <Stack
        sx={{
          marginTop: '0.6rem',
          display: 'flex',
          justifyContent: 'space-between',
          flexDirection: 'row',
        }}
      >
        <Typography sx={HeaderText}>로그인</Typography>
        <Box onClick={onClose} sx={CloseBox}>
          <img
            src="/logo/ic_close.svg"
            s
            alt=""
            style={{
              width: '2.4rem',
              height: '2.4rem',
              '&:hover': {
                backgroundColor: '#fff',
              },
            }}
          />
        </Box>
      </Stack>
      <Stack sx={{ marginTop: '2.5rem' }}>
        <FormTextBox>
          <FormFieldTitle variant="body1">아이디</FormFieldTitle>
          <FormTextField
            margin="normal"
            required
            fullWidth
            id="username"
            label="아이디"
            name="username"
            autoComplete="username"
            autoFocus
            InputLabelProps={{
              shrink: false,
              style: {
                opacity: usernameLabelHidden ? 0 : 1,
              },
            }}
            onFocus={() => handleFocus('username')}
            onBlur={() => handleBlur('username')}
            onChange={handleChange}
          />
        </FormTextBox>
        <FormTextBox>
          <FormFieldTitle variant="body1">비밀번호</FormFieldTitle>
          <FormTextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="비밀번호"
            type="password"
            id="password"
            autoComplete="current-password"
            InputLabelProps={{
              shrink: false,
              style: {
                opacity: passwordLabelHidden ? 0 : 1,
              },
            }}
            onFocus={() => handleFocus('password')}
            onBlur={() => handleBlur('password')}
            onChange={handleChange}
          />
        </FormTextBox>
      </Stack>
      <Stack
        sx={{
          marginTop: 'auto',
        }}
      >
        {error && <Alert severity="error">{error}</Alert>}
        <FormSubmitButton
          type="submit"
          fullWidth
          variant="contained"
          disabled={loading}
        >
          로그인
        </FormSubmitButton>
      </Stack>
    </Stack>
  );
};

export default LoginModal;
