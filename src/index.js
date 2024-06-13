class WindowManager {
  constructor() {
    this.pendingChanges = {};
    this.init();
  }

  init() {
    this.checkLoginStatus();
    this.initEventListeners();
    this.loadPanelsFromServer();
  }

  checkLoginStatus() {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('username');
    if (token && username) {
      this.updateHeaderWithUsername(username);
      this.toggleAuthRequiredElements(true);
    } else {
      this.toggleAuthRequiredElements(false);
    }
  }

  initEventListeners() {
    document.addEventListener('DOMContentLoaded', () => {
      const nav = document.querySelector('.nav');
      const navMenu = nav.querySelector('.nav-menu');
      const newWindow = document.getElementById('new-window');
      const modal = document.getElementById('modal');
      const closeButton = modal.querySelector('.close-button');
      const form = document.getElementById('new-window-form');
      const saveButton = document.getElementById('save-button');
      const taskList = document.querySelector('.taskbar-items');

      const signupButton = document.getElementById('signup-button');
      const loginButton = document.getElementById('login-button');
      const logoutButton = document.getElementById('logout-button');
      const signupModal = document.getElementById('signup-modal');
      const loginModal = document.getElementById('login-modal');
      const closeSignupButton = signupModal.querySelector('.close-button');
      const closeLoginButton = loginModal.querySelector('.close-button');
      const signupForm = document.getElementById('signup-form');
      const loginForm = document.getElementById('login-form');

      if (!modal.showModal) {
        dialogPolyfill.registerDialog(modal);
        dialogPolyfill.registerDialog(signupModal);
        dialogPolyfill.registerDialog(loginModal);
      }

      nav.addEventListener('click', (event) =>
        this.toggleNavMenu(event, navMenu, nav)
      );
      document.addEventListener('click', (event) =>
        this.closeNavMenu(event, navMenu, nav)
      );
      newWindow.addEventListener('click', (e) =>
        this.openModal(e, modal, navMenu)
      );
      closeButton.addEventListener('click', (e) => this.closeModal(e, modal));
      form.addEventListener('submit', (e) => this.handleFormSubmit(e, modal));
      saveButton.addEventListener('click', () => this.applyPendingChanges());
      taskList.addEventListener('click', (event) =>
        this.handleTaskItemClick(event)
      );

      signupButton.addEventListener('click', () => {
        signupModal.showModal();
      });

      closeSignupButton.addEventListener('click', () => {
        signupModal.close();
      });

      signupForm.addEventListener('submit', (e) => this.handleSignupSubmit(e));

      loginButton.addEventListener('click', () => {
        loginModal.showModal();
      });

      closeLoginButton.addEventListener('click', () => {
        loginModal.close();
      });

      loginForm.addEventListener('submit', (e) => this.handleLoginSubmit(e));

      logoutButton.addEventListener('click', () => this.handleLogout());

      document
        .querySelector('.nav-item:nth-child(2)')
        .addEventListener('click', () => this.minimizeAllPanels());
      document
        .querySelector('.nav-item:nth-child(3)')
        .addEventListener('click', () => this.restoreAllPanels());
      document
        .querySelector('.nav-item:nth-child(4)')
        .addEventListener('click', () => this.arrangePanels('grid'));
      document
        .querySelector('.nav-item:nth-child(5)')
        .addEventListener('click', () => this.arrangePanels('stack'));

      document.querySelectorAll(['input[name="action"]']).forEach((radio) => {
        radio.addEventListener('change', (event) =>
          this.handleActionChange(event)
        );
      });
    });
  }

  async loadPanelsFromServer() {
    const token = localStorage.getItem('token');
    if (!token) return;

    try {
      const response = await fetch('http://localhost:3000/panels', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log('response', response);
      if (response.ok) {
        const panels = await response.json();
        panels
          .sort((a, b) => a.order - b.order)
          .forEach((panelData) => {
            this.pendingChanges[panelData.id] = panelData;
            this.createPanel(panelData);
          });
        this.updateTaskList(panels);
      } else {
        console.error('패널 불러오기 실패:', response.statusText);
      }
    } catch (error) {
      console.error('패널 불러오기 오류:', error);
    }
  }

  async handleSignupSubmit(e) {
    e.preventDefault();
    const username = document.getElementById('signup-username').value;
    const password = document.getElementById('signup-password').value;

    try {
      const response = await fetch('http://localhost:3000/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        alert('회원가입 성공');
        document.getElementById('signup-modal').close();
      } else {
        const errorData = await response.json();
        alert(`회원가입 실패: ${errorData.message}`);
      }
    } catch (error) {
      console.error('회원가입 오류:', error);
      alert('회원가입 중 오류가 발생했습니다.');
    }
  }

  async handleLoginSubmit(e) {
    e.preventDefault();
    const username = document.getElementById('login-username').value;
    const password = document.getElementById('login-password').value;

    try {
      const response = await fetch('http://localhost:3000/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('token', data.accessToken);
        localStorage.setItem('username', username);
        this.updateHeaderWithUsername(username);
        document.getElementById('login-modal').close();
        this.toggleAuthRequiredElements(true);
        this.loadPanelsFromServer();
      } else {
        const errorData = await response.json();
        alert(`로그인 실패: ${errorData.message}`);
      }
    } catch (error) {
      console.error('로그인 오류:', error);
      alert('로그인 중 오류가 발생했습니다.');
    }
  }

  handleLogout() {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    this.updateHeaderWithUsername(null);
    this.toggleAuthRequiredElements(false);
    this.clearPanels();
    this.clearTaskList();
  }

  updateHeaderWithUsername(username) {
    let userDisplay = document.getElementById('user-display');
    if (!userDisplay) {
      userDisplay = document.createElement('div');
      userDisplay.id = 'user-display';
      const header = document.querySelector('header');
      header.appendChild(userDisplay);
    }
    userDisplay.textContent = username ? `환영합니다, ${username}님!` : '';
  }

  toggleAuthRequiredElements(isAuthenticated) {
    const elements = document.querySelectorAll('.auth-required');
    elements.forEach((element) => {
      element.style.display = isAuthenticated ? 'block' : 'none';
    });

    document.getElementById('signup-button').style.display = isAuthenticated
      ? 'none'
      : 'inline-block';
    document.getElementById('login-button').style.display = isAuthenticated
      ? 'none'
      : 'inline-block';
    document.getElementById('logout-button').style.display = isAuthenticated
      ? 'inline-block'
      : 'none';
  }

  clearPanels() {
    const main = document.querySelector('main');
    main.innerHTML = '';
    // this.panelOrder = [];
    this.pendingChanges = {};
  }

  clearTaskList() {
    const taskList = document.querySelector('.taskbar-items');
    taskList.innerHTML = '<li class="taskbar-item">시작</li>';
  }

  toggleNavMenu(event, navMenu) {
    event.stopPropagation();
    navMenu.classList.toggle('nav-menu--visible');
    const menuRect = navMenu.getBoundingClientRect();
    if (menuRect.right > window.innerWidth) {
      navMenu.classList.add('right-aligned');
    } else {
      navMenu.classList.remove('right-aligned');
    }
  }

  closeNavMenu(event, navMenu, nav) {
    if (!nav.contains(event.target)) {
      navMenu.classList.remove('nav-menu--visible');
    }
  }

  openModal(e, modal, navMenu) {
    e.stopPropagation();
    const token = localStorage.getItem('token');
    if (!token) {
      alert('로그인이 필요합니다.');
      return;
    }
    modal.showModal();
    navMenu.classList.remove('nav-menu--visible');
  }

  closeModal(e, modal) {
    e.stopPropagation();
    modal.close();
  }

  handleFormSubmit(e, modal) {
    e.preventDefault();
    const action = document.querySelector('input[name="action"]:checked').value;
    const title = document.getElementById('window-title').value;
    const content = document.getElementById('window-content').value;
    const timezone = document.getElementById('timezone').value;

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
      // order: this.panelOrder.length,
      order: Object.keys(this.pendingChanges).length,
    };

    this.createPanel(windowData);
    this.updateTaskList([windowData]);
    this.savePendingChanges(windowData);

    modal.close();
  }

  async savePanelToServer(panelData) {
    const token = localStorage.getItem('token');
    if (!token) return;

    try {
      const response = await fetch('http://localhost:3000/panels', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(panelData),
      });

      if (response.ok) {
        const savedPanel = await response.json();
        console.log('패널 생성 성공:', savedPanel);
        this.pendingChanges[savedPanel.id] = savedPanel;
      } else {
        console.error('패널 생성 실패:', response.statusText);
      }
    } catch (error) {
      console.error('패널 생성 오류:', error);
    }
  }

  handleActionChange(event) {
    const windowFields = document.querySelectorAll('#window-content');
    const timezoneSelect = document.getElementById('timezone');
    if (event.target.value === 'browser') {
      windowFields.forEach((field) => (field.disabled = false));
      timezoneSelect.disabled = true;
    } else if (event.target.value === 'clock') {
      windowFields.forEach((field) => (field.disabled = true));
      timezoneSelect.disabled = false;
    }
  }

  handleTaskItemClick(event) {
    const taskItem = event.target.closest('.taskbar-item');
    if (!taskItem) return;

    const panelId = taskItem.dataset.id;
    const panel = document.querySelector(`.window[data-id='${panelId}']`);

    if (panel) {
      if (panel.style.display === 'flex') {
        panel.style.display = 'none';
        this.pendingChanges[panelId].isHide = true;
        console.log('hide', this.pendingChanges[panelId].isHide);
      } else {
        panel.style.display = 'flex';
        this.pendingChanges[panelId].isHide = false;
        this.bringToFront(panel, this.pendingChanges[panelId]);
        console.log('show', this.pendingChanges[panelId].isHide);
      }
    }
  }

  minimizeAllPanels() {
    Object.keys(this.pendingChanges).forEach((key) => {
      const data = this.pendingChanges[key];
      const panel = document.querySelector(`.window[data-id='${data.id}']`);
      if (panel) {
        panel.style.display = 'none';
        data.isHide = true;
      }
    });
  }

  restoreAllPanels() {
    Object.keys(this.pendingChanges).forEach((key) => {
      const data = this.pendingChanges[key];
      data.isHide = false;
      const panel = document.querySelector(`.window[data-id='${data.id}']`);
      if (panel) {
        panel.style.display = 'flex';
      }
    });
  }

  arrangePanels(type) {
    if (type === 'grid') {
      this.arrangePanelsGrid();
    } else if (type === 'stack') {
      this.arrangePanelsStack();
    }
  }

  arrangePanelsGrid() {
    const main = document.querySelector('main');
    const panels = document.querySelectorAll('.window');
    const numPanels = panels.length;
    const numCols = Math.ceil(Math.sqrt(numPanels));
    const numRows = Math.ceil(numPanels / numCols);
    const panelWidth = main.clientWidth / numCols;
    const panelHeight = main.clientHeight / numRows;

    let leftOffset = 0;
    let topOffset = 0;
    let col = 0;

    panels.forEach((panel) => {
      panel.style.width = `${panelWidth}px`;
      panel.style.height = `${panelHeight}px`;
      panel.style.transform = `translate(${leftOffset}px, ${topOffset}px)`;
      col++;
      if (col >= numCols) {
        col = 0;
        leftOffset = 0;
        topOffset += panelHeight;
      } else {
        leftOffset += panelWidth;
      }
    });
    this.saveAllPanelPositions();
  }

  arrangePanelsStack() {
    const main = document.querySelector('main');
    const panels = document.querySelectorAll('.window');
    const stackOffset = 30;

    const mainWidth = main.clientWidth;
    const mainHeight = main.clientHeight;

    const panelWidth = mainWidth * 0.5;
    const panelHeight = mainHeight * 0.5;

    const startX = (mainWidth - panelWidth) / 2;
    const startY = (mainHeight - panelHeight) / 3;

    panels.forEach((panel, index) => {
      console.log(panel);
      panel.style.width = `${panelWidth}px`;
      panel.style.height = `${panelHeight}px`;
      panel.style.transform = `translate(${startX + index * stackOffset}px, ${
        startY + index * stackOffset
      }px)`;
    });

    this.saveAllPanelPositions();
  }

  saveAllPanelPositions() {
    const panels = document.querySelectorAll('.window');
    panels.forEach((panel) => {
      const id = panel.dataset.id;
      const transform = panel.style.transform.match(/-?\d+\.?\d*/g);
      const x = parseFloat(transform[0]);
      const y = parseFloat(transform[1]);
      const width = panel.clientWidth;
      const height = panel.clientHeight;

      if (this.pendingChanges[id]) {
        this.pendingChanges[id].x = x;
        this.pendingChanges[id].y = y;
        this.pendingChanges[id].width = width;
        this.pendingChanges[id].height = height;
      }
      if (this.pendingChanges[id].isMaximize) {
        this.pendingChanges[id].isMaximize = false;
      }
    });
  }

  findPanelById(panelArray, panelId) {
    return panelArray.find((data) => data.id === parseInt(panelId));
  }

  createPanel(windowData) {
    if (windowData.isClose) return;

    const main = document.querySelector('main');
    const container = document.createElement('section');
    container.dataset.id = windowData.id;
    container.classList.add('window');

    container.innerHTML = `
    <div class='window-header'>
        <div class='window-header-bar'>
          <div class='window-header-title'>${windowData.title}</div>
        </div>
        <div class='window-controls'>
          <button class='maximize-button'>&#43;</button>
          <button class='minimize-button'>&#45;</button>
          <button class='close-button'>X</button>
        </div>
    </div>
      <div class='window-content'>
        ${
          windowData.action === 'browser'
            ? `<iframe src="${windowData.content}" frameborder="0"></iframe>`
            : windowData.action === 'clock'
              ? `<div class="clock" data-timezone="${windowData.timezone}"></div>`
              : ''
        }
      </div>
      <div class='resize-handle top-left'></div>
      <div class='resize-handle top-right'></div>
      <div class='resize-handle bottom-left'></div>
      <div class='resize-handle bottom-right'></div>
    `;

    this.addPanelEventListeners(container, windowData);

    if (windowData.isHide) container.style.display = 'none';
    container.style.width = `${windowData.width}px`;
    container.style.height = `${windowData.height}px`;

    if (windowData.isMaximize) {
      this.maximizePanel(container);
    }

    container.style.transform = `translate(${windowData.x}px, ${windowData.y}px)`;
    main.appendChild(container);

    if (windowData.action === 'clock') {
      this.displayClock(container.querySelector('.clock'), windowData.timezone);
    }
  }

  addPanelEventListeners(container, windowData) {
    const maximizeButton = container.querySelector('.maximize-button');
    const minimizeButton = container.querySelector('.minimize-button');
    const closeButton = container.querySelector('.close-button');
    const resizeHandles = container.querySelectorAll('.resize-handle');
    const windowHeader = container.querySelector('.window-header-bar');

    maximizeButton.addEventListener('click', () => {
      this.maximizePanel(container, windowData);
      windowData.isMaximize = true;
      windowData.x = 0;
      windowData.y = 0;

      this.savePendingChanges(windowData);
    });

    minimizeButton.addEventListener('click', () => {
      container.style.display = 'none';
      windowData.isHide = true;
      this.savePendingChanges(windowData);
    });

    closeButton.addEventListener('click', (e) => {
      e.stopPropagation;
      container.remove();
      windowData.isClose = true;
      this.removeTaskFromList(windowData.title);
      this.savePendingChanges(windowData);
    });

    resizeHandles.forEach((handle) => {
      handle.addEventListener('mousedown', (e) => {
        this.startResize(e, container, windowData, handle.classList[1]);
      });
    });

    windowHeader.addEventListener('mousedown', (e) => {
      this.startDrag(e, container, windowData);
      this.bringToFront(container, windowData);
    });

    windowHeader.addEventListener('dblclick', () => {
      this.maximizePanel(container);
      windowData.isMaximize = true;
      this.savePendingChanges(windowData);
    });
  }

  savePendingChanges(panelData) {
    this.pendingChanges[`${panelData.id}`] = panelData;
  }

  async applyPendingChanges() {
    const token = localStorage.getItem('token');
    if (!token) return;

    let panelArray = Object.values(this.pendingChanges);

    console.log('panelArray', panelArray);

    try {
      const response = await fetch('http://localhost:3000/panels/save', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(panelArray),
      });
      if (response.ok) {
        const savePanels = await response.json();
        console.log('패널 저장 성공:', savePanels);
        savePanels.forEach((panelData) => {
          console.log('panelData', panelData);
          this.pendingChanges[panelData.id] = panelData;
          console.log(this.pendingChanges);
        });
        this.pendingChanges = {};
        alert('패널이 성공적으로 저장되었습니다.');
      } else {
        console.error('패널 저장 실패:', response.statusText);
        alert('패널 저장 중 오류가 발생했습니다.');
      }
    } catch (error) {
      console.error('패널 저장 오류:', error);
      alert('패널 저장 중 오류가 발생했습니다.');
    }
  }

  startDrag(e, container, panelData) {
    const main = document.querySelector('main');
    const startX = e.clientX;
    const startY = e.clientY;
    const transform = container.style.transform.match(/-?\d+\.?\d*/g);
    const startLeft = parseFloat(transform[0]);
    const startTop = parseFloat(transform[1]);

    const onDrag = (e) => {
      const newX = startLeft + (e.clientX - startX);
      const newY = startTop + (e.clientY - startY);

      container.style.transform = `translate(${newX}px, ${newY}px)`;
      panelData.x = newX;
      panelData.y = newY;

      this.savePendingChanges(panelData);
    };

    const stopDrag = () => {
      document.removeEventListener('mousemove', onDrag);
      document.removeEventListener('mouseup', stopDrag);
    };

    document.addEventListener('mousemove', onDrag);
    document.addEventListener('mouseup', stopDrag);
  }

  startResize(e, container, panelData, handleType) {
    e.preventDefault();
    const startX = e.clientX;
    const startY = e.clientY;
    const startWidth = container.offsetWidth;
    const startHeight = container.offsetHeight;

    const transformValues = container.style.transform.match(/-?\d+\.?\d*/g);
    const startLeft = parseFloat(transformValues[0]);
    const startTop = parseFloat(transformValues[1]);

    const onResize = (e) => {
      e.preventDefault();
      let newWidth = startWidth;
      let newHeight = startHeight;
      let newLeft = startLeft;
      let newTop = startTop;

      if (handleType.includes('right')) {
        newWidth = startWidth + (e.clientX - startX);
      }
      if (handleType.includes('left')) {
        newWidth = startWidth - (e.clientX - startX);
        newLeft = startLeft + (e.clientX - startX);
      }
      if (handleType.includes('bottom')) {
        newHeight = startHeight + (e.clientY - startY);
      }
      if (handleType.includes('top')) {
        newHeight = startHeight - (e.clientY - startY);
        newTop = startTop + (e.clientY - startY);
      }

      container.style.width = `${newWidth}px`;
      container.style.height = `${newHeight}px`;
      container.style.transform = `translate(${newLeft}px, ${newTop}px)`;

      panelData.width = newWidth;
      panelData.height = newHeight;
      panelData.x = newLeft;
      panelData.y = newTop;
      panelData.isResize = true;
      panelData.isMaximize = false;
      this.savePendingChanges(panelData);
    };

    const stopResize = () => {
      document.removeEventListener('mousemove', onResize);
      document.removeEventListener('mouseup', stopResize);
    };

    document.addEventListener('mousemove', onResize);
    document.addEventListener('mouseup', stopResize);
  }

  maximizePanel(container) {
    const main = document.querySelector('main');

    container.style.width = `${main.clientWidth}px`;
    container.style.height = `${main.clientHeight}px`;
    container.style.transform = 'translate(0, 0)';
  }

  bringToFront(element) {
    const parent = element.parentNode;

    parent.appendChild(element);

    Array.from(parent.querySelectorAll('section.window')).forEach(
      (section, index) => {
        const panelId = section.dataset.id;
        // if (!this.pendingChanges[panelId]) {
        //   this.pendingChanges[panelId] = {};
        // }
        this.pendingChanges[panelId].order = index;
      }
    );

    document
      .querySelectorAll('.window')
      .forEach((win) => win.classList.remove('active'));
    element.classList.add('active');
  }

  removeTaskFromList(title) {
    const taskList = document.querySelector('.taskbar-items');
    const tasks = taskList.querySelectorAll('.taskbar-item');
    tasks.forEach((task) => {
      if (task.textContent.trim() === title) {
        taskList.removeChild(task);
      }
    });
  }

  updateTaskList(panels) {
    if (!Array.isArray(panels)) {
      panels = [panels];
    }

    panels
      .sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
      .forEach((panelData) => {
        if (panelData.isClose) return;

        console.log('updateTaskList', panelData);

        const taskList = document.querySelector('.taskbar-items');
        const task = document.createElement('li');
        task.classList.add('taskbar-item');
        task.dataset.id = panelData.id;
        task.innerHTML = `<span>${panelData.title}</span>`;
        task.draggable = true;

        task.addEventListener('dragstart', this.handleDragStart.bind(this));
        task.addEventListener('dragover', this.handleDragOver.bind(this));
        task.addEventListener('drop', this.handleDrop.bind(this));
        task.addEventListener('dragend', this.handleDragEnd.bind(this));

        taskList.appendChild(task);
      });
  }

  handleDragStart(e) {
    this.draggedItem = e.target;
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', e.target.innerHTML);
    e.target.classList.add('dragging');
  }

  handleDragOver(e) {
    if (e.preventDefault) e.preventDefault();
    return false;
  }

  handleDrop(e) {
    if (e.stopPropagation) e.stopPropagation();

    if (this.draggedItem !== e.target) {
      this.draggedItem.innerHTML = e.target.innerHTML;
      e.target.innerHTML = e.dataTransfer.getData('text/html');

      const draggedId = this.draggedItem.dataset.id;
      const targetId = e.target.dataset.id;
      this.draggedItem.dataset.id = targetId;
      e.target.dataset.id = draggedId;

      const draggedData = this.pendingChanges[`windowData-${draggedId}`];
      const targetData = this.pendingChanges[`windowData-${targetId}`];

      this.pendingChanges[`windowData-${targetId}`] = draggedData;
      this.pendingChanges[`windowData-${draggedId}`] = targetData;
    }

    return false;
  }

  handleDragEnd(e) {
    e.target.classList.remove('dragging');
  }

  displayClock(clock, timezone) {
    const updateClock = () => {
      const date = new Date();
      const options = {
        timeZone: timezone,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      };
      const timeString = date.toLocaleTimeString('en-US', options);
      clock.textContent = timeString;
    };
    updateClock();
    setInterval(updateClock, 1000);
  }
}

const windowManager = new WindowManager();
