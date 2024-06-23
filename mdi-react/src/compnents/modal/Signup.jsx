import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Typography, Alert, Stack } from '@mui/material';
import { signUp } from '../../features/auth/authSlice';
import {
  FormFieldTitle,
  FormSubmitButton,
  FormTextBox,
  FormTextField,
} from '../../style/FormStyled';

const Signup = ({ onClose }) => {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);
  const [usernameLabelHidden, setUsernameLabelHidden] = useState(false);
  const [passwordLabelHidden, setPasswordLabelHidden] = useState(false);

  const handleFocus = (field) => {
    console.log('handleFocus', field);
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
    dispatch(signUp(formData)).then((result) => {
      if (signUp.fulfilled.match(result)) {
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
      <Stack sx={{ marginTop: '0.6rem' }}>
        <Typography
          sx={{
            fontSize: '1.8rem',
            fontWeight: '700',
          }}
        >
          회원가입
        </Typography>
      </Stack>
      <Stack sx={{ marginTop: '2.5rem' }}>
        <FormTextBox>
          <FormFieldTitle variant="body1">이름</FormFieldTitle>
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
      {error && <Alert severity="error">{error}</Alert>}
      <Stack
        sx={{
          marginTop: 'auto',
        }}
      >
        <FormSubmitButton
          type="submit"
          fullWidth
          variant="contained"
          disabled={loading}
        >
          회원가입
        </FormSubmitButton>
      </Stack>
    </Stack>
  );
};

export default Signup;
