import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TextField, Button, Box, Typography, Alert } from '@mui/material';
import { signUp } from '../../features/auth/authSlice';

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
      <TextField
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
      <TextField
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
      {error && <Alert severity="error">{error}</Alert>}
      <Button
        type="submit"
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
        disabled={loading}
      >
        회원가입
      </Button>
    </Box>
  );
};

export default Signup;
