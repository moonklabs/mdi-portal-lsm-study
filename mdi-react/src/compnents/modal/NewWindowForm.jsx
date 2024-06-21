import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addPanel } from '../../features/panels/panelSlice';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  RadioGroup,
  FormControlLabel,
  Radio,
  Select,
  MenuItem,
  Box,
  styled,
} from '@mui/material';
import { FormFieldTitle, FormSubmitButton } from '../../style/FormStyled';

const NewWindowForm = ({ open, onClose }) => {
  const [title, setTitle] = useState('');
  const [action, setAction] = useState('');
  const [content, setContent] = useState('');
  const [timezone, setTimezone] = useState('default');
  const dispatch = useDispatch();

  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (action === 'clock' && timezone === 'default') {
      alert('시계 패널을 생성하려면 타임존을 선택해주세요.');
      return;
    }

    const windowData = {
      id: `temp-${Date.now()}`,
      width: 400,
      height: 300,
      x: 0,
      y: 0,
      isHide: false,
      isMaximize: false,
      isMinimize: false,
      isClose: false,
      isDrag: false,
      isResize: false,
      isClock: action === 'clock',
      isBrowser: action === 'browser',
      action,
      title,
      content,
      timezone,
      order: Date.now(),
    };

    dispatch(addPanel(windowData));
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <Box
        sx={{
          width: '25rem',
          height: 'auto',
          display: 'flex',
          flexDirection: 'column',
          padding: '1.6rem',
          gap: '1rem',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <DialogTitle
            sx={{
              padding: '0',
            }}
          >
            새 창 만들기
          </DialogTitle>
          <Button
            onClick={onClose}
            sx={{
              minWidth: '2rem',
              minHeight: '2rem',
              padding: '0.5rem',
              borderRadius: '50%',
              '&:hover': {
                backgroundColor: '#fff',
              },
            }}
          >
            <img src="logo/ic_close.svg" alt="close" />
          </Button>
        </Box>
        <DialogContent
          sx={{
            padding: '0',
          }}
        >
          <form onSubmit={handleFormSubmit}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <Box
                sx={{
                  mb: '1rem',
                }}
              >
                <FormFieldTitle variant="body1">새창 이름</FormFieldTitle>
                <TextField
                  label="이름"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  fullWidth
                  required
                  sx={Field}
                />
              </Box>

              <RadioGroup
                value={action}
                onChange={(e) => setAction(e.target.value)}
                sx={{
                  gap: '1rem',
                }}
              >
                <Box>
                  <RadioButtonLabel
                    value="browser"
                    control={<Radio />}
                    label="브라우저로 사용"
                  />
                  <FormFieldTitle variant="body1">URL</FormFieldTitle>
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      gap: '1rem',
                      alignItems: 'center',
                    }}
                  >
                    <TextField
                      label="URL"
                      value={content}
                      onChange={(e) => setContent(e.target.value)}
                      fullWidth
                      required
                      sx={Field}
                    />
                  </Box>
                </Box>
                <Box>
                  <RadioButtonLabel
                    value="clock"
                    control={<Radio />}
                    label="시계 사용"
                    sx={{
                      color: '#343434',
                      fontSize: '1rem',
                    }}
                  />
                  <FormFieldTitle variant="body1">시계</FormFieldTitle>
                  <Select
                    value={timezone}
                    onChange={(e) => setTimezone(e.target.value)}
                    fullWidth
                    sx={Field}
                  >
                    <MenuItems value="default">도시를 선택해주세요.</MenuItems>
                    <MenuItem value="Asia/Seoul">Seoul (UTC+09:00)</MenuItem>
                    <MenuItem value="Asia/Tokyo">Tokyo (UTC+09:00)</MenuItem>
                    <MenuItem value="America/New_York">
                      New York (UTC-05:00)
                    </MenuItem>
                    <MenuItem value="Europe/London">
                      London (UTC+00:00)
                    </MenuItem>
                    <MenuItem value="Europe/Paris">Paris (UTC+01:00)</MenuItem>
                    <MenuItem value="Europe/Berlin">
                      Berlin (UTC+01:00)
                    </MenuItem>
                    <MenuItem value="Asia/Shanghai">
                      Shanghai (UTC+08:00)
                    </MenuItem>
                    <MenuItem value="Australia/Sydney">
                      Sydney (UTC+10:00)
                    </MenuItem>
                  </Select>
                </Box>
              </RadioGroup>
              <DialogActions
                sx={{
                  p: 0,
                }}
              >
                <FormSubmitButton type="submit">생성</FormSubmitButton>
              </DialogActions>
            </Box>
          </form>
        </DialogContent>
      </Box>
    </Dialog>
  );
};

const Field = {
  '& .MuiInputBase-input': {
    p: '0.8rem',
    fontSize: '0.8rem',
  },
  '& .MuiInputLabel-root': {
    top: '50%',
    transform: 'translate(0.6rem, -50%)',
    fontSize: '0.8rem',
  },
  '& .MuiInputLabel-shrink': {
    transform: 'translate(0.8rem, -150%)',
  },
};

const RadioButtonLabel = styled(FormControlLabel)({
  '& .MuiFormControlLabel-label': {
    color: '#343434',
    fontSize: '0.9rem',
  },
});

const MenuItems = styled(MenuItem)({
  '& MuiInputBase-root': {
    fontSize: '0.2rem',
  },
});

export default NewWindowForm;
