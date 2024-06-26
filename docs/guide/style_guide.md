# Style Guide

### If you want to change the design, please refer to this Style Guide.

_If you are not familiar with MUI, it is recommended to learn MUI first._

## Header

In the Header, you can modify the logo and Header text. The `sx={{Text}}` in the component applies common text styles. If you want to change the Text code, please refer to the Common Style section below.

```js
// Styles used only in this component are written at the bottom of the component.

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
```

## TaskList

In TaskList, you can specify the styles for the widget list and menu items. If you want to change the position or style of the Popover tag, please refer to [Popover](https://mui.com/material-ui/react-popover/).

```js
// Styles used only in this component are written at the bottom of the component.

const TaskMenuButton = styled(Button)({
  borderRadius: 0,
  border: 'none',
  fontSize: '1.4rem',
  fontWeight: '400',
  borderRight: '1px solid #E1E1E1',
  color: '#3A3A3A',
  textTransform: 'none',

  '&:hover': {
    backgroundColor: '#F1F4FD',
    border: 'none',
    borderRight: '1px solid #E1E1E1',
  },
});

const PopoverMunu = styled(MenuItem)({
  width: '100%',
  borderBottom: '1px solid #E1E1E1',
  fontSize: '1.4rem',
  lineHeight: '1.6rem',
  fontWeight: '400',
  height: '4rem',
  minHeight: 'auto',

  '&:hover': {
    backgroundColor: '#F1F4FD',
  },
});

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '40rem',
  height: '50.6rem',
  bgcolor: 'background.paper',
  boxShadow: 3,
  padding: '2.4rem',
  borderRadius: '0.4rem',
};
```

## Panel

The header style of the widget can be modified in `PanelHeader` where you can change the style of the widget's title, header color, and header icon.

## Common Style

`src/style/CommonStyle.js` contains styles used commonly across the application.

```js
export const Text = {
  fontSize: '1.4rem',
  fontWeight: '400',
  letterSpacing: '0.1rem',
  padding: '0',
  margin: '0',
  minWidth: 'auto',
  minHeight: 'auto',
};

export const HeaderText = {
  fontSize: '1.8rem',
  fontWeight: '700',
  letterSpacing: '0.1rem',
  padding: '0',
  margin: '0',
  minWidth: 'auto',
  minHeight: 'auto',
};

export const CloseBox = {
  height: '100%',
  minWidth: 'auto',
  minHeight: 'auto',
  padding: '0',
  cursor: 'pointer',
};

// src/components/header.jsx

<HeaderContentBox>
  <Button color="inherit" onClick={handleSignupOpen} sx={Text}>
    회원가입
  </Button>
  <CenterBar />
  <Button color="inherit" onClick={handleLoginOpen} sx={Text}>
    로그인
  </Button>
</HeaderContentBox>;
```

Common styles are written to avoid redundancy and to be reused.

## Form Style

`src/style/FormStyled.js` contains styles used for forming components.

```js
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
  boxShadow: 'none',

  '&:hover': {
    backgroundColor: '#111111',
  },
});

export const FormTextField = styled(TextField)({
  margin: '0',
  '& .MuiInputBase-root': {
    height: '4rem',
    padding: '1rem',
    // backgroundColor: '#111',
  },
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
});

export const FormTextBox = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  marginBottom: '2rem',
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
```

Inline styles within the form tags are mostly for interactions, and you can change the form style by adjusting the styles in the above code.

_If you encounter issues or find any errors while following the guide, please send an email._
