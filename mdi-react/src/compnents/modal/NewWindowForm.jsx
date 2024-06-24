import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addPanel } from '../../features/panels/panelSlice';
import {
  Button,
  Checkbox,
  MenuItem,
  Box,
  styled,
  Stack,
  Typography,
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
  const [titleLabelHidden, setTitleLabelHidden] = useState(false);
  const [urlLabelHidden, setUrlLabelHidden] = useState(false);

  const handleFocus = (field) => {
    if (field === 'title') {
      setTitleLabelHidden(true);
    } else if (field === 'content') {
      setUrlLabelHidden(true);
    }
  };

  const handleBlur = (field) => {
    if (field === 'title' && title === '') {
      setTitleLabelHidden(false);
    } else if (field === 'content' && content === '') {
      setUrlLabelHidden(false);
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (isClockChecked && timezone === 'default') {
      alert('시계 패널을 생성하려면 타임존을 선택해주세요.');
      return;
    }

    if (isBrowserChecked && content === '') {
      alert('브라우저 패널을 생성하려면 URL을 입력해주세요.');
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
      content: isBrowserChecked ? content : null,
      timezone: isClockChecked ? timezone : null,
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
    <Stack
      component="form"
      onSubmit={handleFormSubmit}
      sx={{
        height: '100%',
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
        <Typography sx={HeaderText}>새 창 만들기</Typography>
        <Button onClick={onClose} sx={CloseBox}>
          <img src="logo/ic_close.svg" alt="close" />
        </Button>
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          height: '100%',
        }}
      >
        <FormTextBox>
          <FormFieldTitle variant="body1">새창 이름</FormFieldTitle>
          <FormTextField
            label="이름"
            name="title"
            value={title}
            fullWidth
            required
            InputLabelProps={{
              shrink: false,
              style: {
                opacity: titleLabelHidden ? 0 : 1,
              },
            }}
            onFocus={() => handleFocus('title')}
            onBlur={() => handleBlur('title')}
            onChange={(e) => setTitle(e.target.value)}
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
              marginBottom: '1.2rem',
            }}
          />
          <FormTextBox>
            <FormFieldTitle variant="body1">URL</FormFieldTitle>
            <FormTextField
              label="URL"
              name="content"
              value={content}
              fullWidth
              required={isBrowserChecked}
              disabled={!isBrowserChecked}
              sx={{
                '& .MuiInputBase-root': {
                  backgroundColor: isBrowserChecked ? '#fff' : '#F4F4F4',
                },
              }}
              InputLabelProps={{
                shrink: false,
                style: {
                  opacity: urlLabelHidden ? 0 : 1,
                },
              }}
              onFocus={() => handleFocus('content')}
              onBlur={() => handleBlur('content')}
              onChange={(e) => setContent(e.target.value)}
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
              marginBottom: '1.2rem',
            }}
          />
          <Box>
            <FormFieldTitle variant="body1">Timezone</FormFieldTitle>
            <FormSelectField
              value={timezone}
              onChange={(e) => setTimezone(e.target.value)}
              fullWidth
              disabled={!isClockChecked}
              sx={{
                backgroundColor: isClockChecked ? '#ffffff' : '#F4F4F4',
                '& .MuiSelect-select': {
                  fontSize: '1.4rem',
                  height: '2rem',
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
              <MenuItems value="Europe/London">London (UTC+00:00)</MenuItems>
              <MenuItems value="Europe/Paris">Paris (UTC+01:00)</MenuItems>
              <MenuItems value="Europe/Berlin">Berlin (UTC+01:00)</MenuItems>
              <MenuItems value="Asia/Shanghai">Shanghai (UTC+08:00)</MenuItems>
              <MenuItems value="Australia/Sydney">Sydney (UTC+10:00)</MenuItems>
            </FormSelectField>
          </Box>
        </Stack>
      </Box>

      <FormSubmitButton type="submit" variant="contained">
        생성
      </FormSubmitButton>
    </Stack>
  );
};

const MenuItems = styled(MenuItem)(({ selected }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '4rem',
  fontSize: '1.4rem',
  color: selected ? '#000' : '#939393',
}));

const StyledCheckbox = styled(Checkbox)({
  color: '#CFCFCF',
  marginRight: '0.5rem',
  '&.Mui-checked': {
    color: '#3B3B3B',
  },
  '& .MuiSvgIcon-root': {
    fontSize: '2.125rem',
  },
});

export default NewWindowForm;
