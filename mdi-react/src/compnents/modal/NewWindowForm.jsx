// src/components/NewWindowForm.js
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
} from '@mui/material';

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
      <DialogTitle>새 창 만들기</DialogTitle>
      <DialogContent>
        <form onSubmit={handleFormSubmit}>
          <TextField
            label="이름"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            fullWidth
            required
          />
          <RadioGroup
            value={action}
            onChange={(e) => setAction(e.target.value)}
            row
          >
            <FormControlLabel
              value="browser"
              control={<Radio />}
              label="브라우저 창"
            />
            <FormControlLabel value="clock" control={<Radio />} label="시계" />
          </RadioGroup>
          {action === 'browser' && (
            <TextField
              label="URL"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              fullWidth
              required
            />
          )}
          {action === 'clock' && (
            <Select
              value={timezone}
              onChange={(e) => setTimezone(e.target.value)}
              fullWidth
            >
              <MenuItem value="default">도시를 선택해주세요.</MenuItem>
              <MenuItem value="Asia/Seoul">Seoul (UTC+09:00)</MenuItem>
              <MenuItem value="Asia/Tokyo">Tokyo (UTC+09:00)</MenuItem>
              <MenuItem value="America/New_York">New York (UTC-05:00)</MenuItem>
              <MenuItem value="Europe/London">London (UTC+00:00)</MenuItem>
              <MenuItem value="Europe/Paris">Paris (UTC+01:00)</MenuItem>
              <MenuItem value="Europe/Berlin">Berlin (UTC+01:00)</MenuItem>
              <MenuItem value="Asia/Shanghai">Shanghai (UTC+08:00)</MenuItem>
              <MenuItem value="Australia/Sydney">Sydney (UTC+10:00)</MenuItem>
            </Select>
          )}
          <DialogActions>
            <Button onClick={onClose} color="primary">
              취소
            </Button>
            <Button type="submit" color="primary">
              생성
            </Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default NewWindowForm;
