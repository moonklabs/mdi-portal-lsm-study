import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Typography, Alert } from '@mui/material';
import { signIn } from '../../features/auth/authSlice';
import {
  FormFieldTitle,
  FormSubmitButton,
  FormTextBox,
  FormTextField,
} from '../../style/FormStyled';

const LoginModal = ({ onClose }) => {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);

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
    <Box component="form" onSubmit={handleSubmit} sx={{ border: 'none' }}>
      <Typography variant="h6">로그인</Typography>
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
          onChange={handleChange}
        />
      </FormTextBox>
      {error && <Alert severity="error">{error}</Alert>}
      <FormSubmitButton
        type="submit"
        fullWidth
        variant="contained"
        disabled={loading}
      >
        로그인
      </FormSubmitButton>
    </Box>
  );
};

export default LoginModal;
