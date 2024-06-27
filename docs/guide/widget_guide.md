# Widget Guide

### 원하는 위젯으로 패널을 만들고 싶다면 해당 가이드를 참고해주세요.

## 패널 생성 시 새로운 유형 추가

`src/components/NewWindowForm.js` 파일을 수정하여 새로운 패널 유형을 선택할 수 있도록 합니다.

```js
// src/modal/NewWindowForm.jsx
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
  action: isBrowserChecked ? content : isClockChecked ? timezone : customApp,
  title,
  content: isBrowserChecked ? content : isClockChecked ? timezone : '',
  timezone: isClockChecked ? timezone : null,
  order: Date.now(),
};
```

> action, content에 customContent를 추가해준 후 customContent에 대한 체크박스를 하나 더 만들어 줍니다.

## 새로운 패널 유형 정의

`src/components/PanelContent.js` 파일을 열고 다음과 같이 새로운 패널 유형을 정의합니다:

```js
// src/components/PanelContent.js

const PanelContent = ({ action, content, title, timezone, currentTime }) => {
  return (
    <Box
      sx={{
        height: '100%',
        borderWidth: '0 1px 1px 1px',
        borderColor: '#D3D3D3',
        borderStyle: 'solid',
      }}
    >
      {action === 'browser' ? (
        <iframe
          src={content}
          title={title}
          style={{ width: '100%', height: '100%', border: 'none' }}
        />
      ) : action === 'clock' ? (
        <div>
          <div>{timezone}</div>
          <Typography variant="h4">{currentTime}</Typography>
        </div>
      ) : action === 'customApp' ? (
        <CustomApp content={content} />
      ) : (
        <Typography variant="body1">Content goes here.</Typography>
      )}
    </Box>
  );
};

export default PanelContent;
```

## CustomApp 컴포넌트 작성

`src/components/CustomApp.js` 파일을 생성하고, 사용자 정의 앱의 로직을 작성합니다.

```js
import React from 'react';

const CustomApp = ({ content }) => {
  // 개인 앱의 로직을 이곳에 작성합니다.
  return (
    <div>
      <h2>Custom App</h2>
      <p>{content}</p>
    </div>
  );
};

export default CustomApp;
```

> 해당 가이드를 따라하시면 custom 위젯을 패널로 생성하실 수 있습니다. 여러개의 custom 위젯을 만들 고 싶으시다면 내용을 토대로 코드를 수정해주시면 되겠습니다.

_가이드 내용을 따라해도 잘안되거나, 잘못된 부분이 있다면 메일 남겨주세요._
