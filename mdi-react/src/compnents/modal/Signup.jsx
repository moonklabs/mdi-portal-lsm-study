import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Typography, Alert } from '@mui/material';
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
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
      <Typography variant="h6">회원가입</Typography>
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
        회원가입
      </FormSubmitButton>
    </Box>
  );
};

export default Signup;
