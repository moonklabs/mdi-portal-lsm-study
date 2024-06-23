import {
  Box,
  Button,
  FormControlLabel,
  Select,
  TextField,
  Typography,
  styled,
} from '@mui/material';

export const FormFieldTitle = styled(Typography)({
  color: '#343434',
  fontSize: '1.4rem',
  marginBottom: '0.8rem',
});

export const FormSubmitButton = styled(Button)({
  width: '100%',
  height: '4.8rem',
  fontWeight: '700',
  fontSize: '1.4rem',
  backgroundColor: '#3B3B3B',
  color: 'white',
  borderRadius: '0.6rem',
  margin: '0',
  marginTop: 'auto',

  '&:hover': {
    backgroundColor: '#111111',
  },
});

export const FormTextField = styled(TextField)({
  margin: '0',
  '& .MuiInputBase-root': { height: '4rem', padding: '1rem' },
  '& .MuiInputBase-input': { padding: '0', fontSize: '1.4rem', height: '2rem' },
  '& .MuiInputLabel-root': {
    top: '50%',
    transform: 'translate(14px, -50%)',
    fontSize: '14px',
    pointerEvents: 'none',
    transition: 'opacity 0.2s ease-in-out',
    opacity: 1,
  },
  '& .MuiInputLabel-shrink': {
    opacity: 0,
    transform: 'translate(14px, -50%)',
  },
  '& .MuiFormLabel-asterisk': {
    display: 'none',
  },
});

export const FormSelectField = styled(Select)({
  margin: '0',
  // '& .MuiInputBase-root': { height: '4rem', padding: '1rem' },
  // '& .MuiInputBase-input': { padding: '0', fontSize: '1.4rem', height: '4rem' },
  // '& .MuiSelect-select': {
  //   padding: '0',
  //   height: '4rem',
  //   lineHeight: '4rem',

  //   '&:focus': {
  //     backgroundColor: 'transparent',
  //   },
  // },
});

export const FormTextBox = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  marginBottom: '2.4rem',
});

export const FormCheckLabel = styled(FormControlLabel)({
  margin: '0',
  '& .MuiFormControlLabel-label': {
    color: '#343434',
    fontSize: '1.4rem',
  },
  '& .MuiCheckbox-root': {
    padding: '0',
  },
});

// FormControlLabel
