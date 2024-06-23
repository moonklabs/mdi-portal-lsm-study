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
  Checkbox,
  FormControlLabel,
  Select,
  MenuItem,
  Box,
  styled,
  Stack,
  InputLabel,
} from '@mui/material';
import {
  FormCheckLabel,
  FormFieldTitle,
  FormSelectField,
  FormSubmitButton,
  FormTextBox,
  FormTextField,
} from '../../style/FormStyled';
import { CloseBox, HeaderText } from '../../style/CommonStyled';

const NewWindowForm = ({ open, onClose }) => {
  const [title, setTitle] = useState('');
  const [isBrowserChecked, setIsBrowserChecked] = useState(false);
  const [isClockChecked, setIsClockChecked] = useState(false);
  const [content, setContent] = useState('');
  const [timezone, setTimezone] = useState('default');
  const dispatch = useDispatch();

  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (isClockChecked && timezone === 'default') {
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
      isClock: isClockChecked,
      isBrowser: isBrowserChecked,
      action: isClockChecked ? 'clock' : 'browser',
      title,
      content,
      timezone,
      order: Date.now(),
    };

    dispatch(addPanel(windowData));
    onClose();
  };

  const handleBrowserChange = () => {
    setIsBrowserChecked(!isBrowserChecked);
    if (isClockChecked) {
      setIsClockChecked(false);
    }
  };

  const handleClockChange = () => {
    setIsClockChecked(!isClockChecked);
    if (isBrowserChecked) {
      setIsBrowserChecked(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <Box
        sx={{
          width: '40rem',
          height: '50.6rem',
          display: 'flex',
          flexDirection: 'column',
          padding: '3rem 2.4rem',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            height: '2.4rem',
          }}
        >
          <DialogTitle sx={HeaderText}>새 창 만들기</DialogTitle>
          <Button onClick={onClose} sx={CloseBox}>
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
                justifyContent: 'center',
                height: '100%',
                mt: '2.4rem',
              }}
            >
              <FormTextBox>
                <FormFieldTitle variant="body1">새창 이름</FormFieldTitle>
                <FormTextField
                  label="이름"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  fullWidth
                  required
                />
              </FormTextBox>
              <Stack
                sx={{
                  fontSize: '1.4rem',
                }}
              >
                <FormCheckLabel
                  control={
                    <StyledCheckbox
                      checked={isBrowserChecked}
                      onChange={handleBrowserChange}
                      disabled={isClockChecked}
                    />
                  }
                  label="브라우저로 사용"
                  sx={{
                    marginBottom: '1.5rem',
                  }}
                />
                <FormTextBox>
                  <FormFieldTitle variant="body1">URL</FormFieldTitle>
                  <FormTextField
                    label="URL"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    fullWidth
                    required={isBrowserChecked}
                    disabled={!isBrowserChecked}
                  />
                </FormTextBox>
                <FormCheckLabel
                  control={
                    <StyledCheckbox
                      checked={isClockChecked}
                      onChange={handleClockChange}
                      disabled={isBrowserChecked}
                    />
                  }
                  label="시계 사용"
                  sx={{
                    marginBottom: '1.5rem',
                  }}
                />
                <Box>
                  <FormSelectField
                    value={timezone}
                    onChange={(e) => setTimezone(e.target.value)}
                    fullWidth
                    disabled={!isClockChecked}
                    sx={{
                      '& .MuiSelect-select': {
                        color: '#939393',
                        fontSize: '1.4rem',
                        height: '2rem',
                        // top: '50%',
                        // transform: 'translate(14px, 30%)',
                        display: 'flex',
                        alignItems: 'center',
                        padding: '1rem',
                      },
                    }}
                  >
                    <MenuItems value="default">도시를 선택해주세요.</MenuItems>
                    <MenuItems value="Asia/Seoul">Seoul (UTC+09:00)</MenuItems>
                    <MenuItems value="Asia/Tokyo">Tokyo (UTC+09:00)</MenuItems>
                    <MenuItems value="America/New_York">
                      New York (UTC-05:00)
                    </MenuItems>
                    <MenuItems value="Europe/London">
                      London (UTC+00:00)
                    </MenuItems>
                    <MenuItems value="Europe/Paris">
                      Paris (UTC+01:00)
                    </MenuItems>
                    <MenuItems value="Europe/Berlin">
                      Berlin (UTC+01:00)
                    </MenuItems>
                    <MenuItems value="Asia/Shanghai">
                      Shanghai (UTC+08:00)
                    </MenuItems>
                    <MenuItems value="Australia/Sydney">
                      Sydney (UTC+10:00)
                    </MenuItems>
                  </FormSelectField>
                </Box>
              </Stack>
            </Box>
          </form>
        </DialogContent>
        <DialogActions
          sx={{
            p: 0,
            mt: 'auto',
          }}
        >
          <FormSubmitButton
            type="submit"
            sx={{
              p: 0,
            }}
          >
            생성
          </FormSubmitButton>
        </DialogActions>
      </Box>
    </Dialog>
  );
};

const MenuItems = styled(MenuItem)({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '4rem',
  fontSize: '1.4rem',
});

const StyledCheckbox = styled(Checkbox)({
  color: '#CFCFCF',
  marginRight: '0.5rem',

  '&.Mui-checked': {
    color: '#3A3A3A',
  },
  '& .MuiSvgIcon-root': {
    fontSize: '2.125rem',
  },
});

export default NewWindowForm;
