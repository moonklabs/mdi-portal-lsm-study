# Style Guide

### 디자인을 변경하시고 싶다면 해당 Style Guide를 참고해주세요.

_MUI에 대한 이해가 없다면 MUI를 먼저 학습하시는 걸 추천드립니다._

## Header

Header에서는 로고, Header text, 정도를 수정할 수 있습니다. 해당 컴포넌트에 있는 `sx={{Text}}`는 Text 공통 스타일을 적용시킨 코드입니다. Text 코드를 변경하고 싶으시다면 아래 Common Style 항목을 참고해주세요.

```js
컴포넌트 하단에 해당 컴포넌트에서만 사용하는 style들이 작성되어 있습니다.

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

TaskList에서는 위젯 리스트, 메뉴 항목에 대한 스타일을 지정할 수 있습니다. Popover 태그의 위치 또는 스타일을 변경하고 싶으시다면 [Popover](https://mui.com/material-ui/react-popover/)를 참고해주세요.

```js
컴포넌트 하단에 해당 컴포넌트에서만 사용하는 style들이 작성되어 있습니다.

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

위젯의 header 스타일은 PanelHeader 에서 위젯의 title, header 색상, header icon에 대한 스타일을 변경하실 수 있습니다.

## Common Style

`src/style/CommonStyle.js` 공통으로 사용되는 스타일입니다.

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

공통 스타일은 위와 같이 중복되는 스타일 위주로 작성되어 있습니다.

## Form Style

`src/style/FormStyled.js` form을 구성하는데 사용되는 스타일이다.

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

form태그 안에 있는 인라인 스타일들은 인터렉션을 위한 스타일이 대부분이고 위 코드의 스타일을 조정하면 form 스타일을 변경할 수 있다.
