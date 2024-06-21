import { Box, Button, TextField, Typography, styled } from '@mui/material';

export const FormFieldTitle = styled(Typography)({
  color: '#343434',
  fontSize: '0.9rem',
  marginBottom: '0.6rem',
});

export const FormSubmitButton = styled(Button)({
  width: '100%',
  backgroundColor: '#3B3B3B',
  color: 'white',
  padding: '0.6rem',
  borderRadius: '0.4rem',
  marginTop: '1.6rem',
  fontWeight: '700',

  '&:hover': {
    backgroundColor: '#111111',
  },
});

export const FormTextField = styled(TextField)({
  marginBottom: '1rem',
  marginTop: '0',
});

export const FormTextBox = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  marginTop: '1rem',
});

// const FieldTitle = {
//   color: '#343434',
//   fontSize: '0.9rem',
//   marginBottom: '0.6rem',
// };

// const FormSubmitButton = styled(Button)({
//   width: '100%',
//   backgroundColor: '#3B3B3B',
//   color: 'white',
//   padding: '0.6rem',
//   borderRadius: '0.4rem',
//   marginTop: '1.8rem',
//   fontWeight: '700',

//   '&:hover': {
//     backgroundColor: '#111111',
//   },
// });

// const LoginTextFeild = styled(TextField)({
//   marginBottom: '1rem',
//   marginTop: '0',
// });

// const LoginTextBox = styled(Box)({
//   display: 'flex',
//   flexDirection: 'column',
//   marginTop: '1rem',
// });
