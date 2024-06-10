// 리펙토링

// 고도화
// form validation
// new window 관련 팝업 모듈을 제작하고 해당 모듈에서 처리
// 유틸모듈을 선언하고 해당 모듈에서 처리
// windowHeader 이벤트 리스너 관련 이슈 빨리 움직이면 안따라옴
// dom api 활용하기 [O]
// taskList => 배열로 task 관리 [O]
// opacity 성능적으로 문제가 있다. display none으로 처리 [O]
class WindowManager {
  constructor() {
    this.panelOrder = [];
    this.pendingChanges = {};
    this.init();
  }

  init() {
    this.initEventListeners();
    this.loadPanelsFromStorage();
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

      if (!modal.showModal) {
        dialogPolyfill.registerDialog(modal);
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

    const panelId = Date.now();

    const windowData = {
      id: panelId,
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
    };

    this.createPanel(windowData);
    this.updateTaskList(windowData);
    this.savePendingChanges(windowData);
    modal.close();
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

    Object.keys(this.pendingChanges).forEach((key) => {
      const data = this.pendingChanges[key];
      data.x = leftOffset;
      data.y = topOffset;
      const panel = document.querySelector(`.window[data-id='${data.id}']`);
      if (panel) {
        panel.style.transform = `translate(${leftOffset}px, ${topOffset}px)`;
        panel.style.display = 'flex';
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

  loadPanelsFromStorage() {
    const panelArray =
      JSON.parse(localStorage.getItem('windowDataArray')) || [];
    this.panelOrder = JSON.parse(localStorage.getItem('panelOrder')) || [];

    console.log('loadPanelsFromStorage', this.panelOrder);

    this.panelOrder.forEach((panelId) => {
      const panelData = panelArray.find(
        (data) => console.log(data.id, panelId) || data.id === parseInt(panelId)
      );
      if (panelData) {
        this.createPanel(panelData);
        this.updateTaskList(panelData);
        this.pendingChanges[panelData.id] = panelData;
      }
    });

    // panelArray.forEach((panelData) => {
    //   this.updateTaskList(panelData);
    //   this.pendingChanges[panelData.id] = panelData;
    // });
  }

  createPanel(windowData) {
    if (windowData.isClose) return;

    const main = document.querySelector('main');
    const container = document.createElement('section');
    container.dataset.id = windowData.id;
    container.classList.add('window');

    container.innerHTML = `
      <div class='window-header'>
        <div class='window-header-title'>${windowData.title}</div>
        </div>
        <div class='window-controls'>
          <button class='maximize-button'>&#43;</button>
          <button class='minimize-button'>&#45;</button>
          <button class='close-button'>X</button>
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
      <div class='resize-handle'></div>
    `;

    this.addPanelEventListeners(container, windowData);

    if (windowData.isHide) container.style.display = 'none';
    if (windowData.isResize) {
      container.style.width = `${windowData.width}px`;
      container.style.height = `${windowData.height}px`;
    }
    if (windowData.isMaximize) this.maximizePanel(container);

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
    const resizeHandle = container.querySelector('.resize-handle');
    const windowHeader = container.querySelector('.window-header');

    maximizeButton.addEventListener('click', () => {
      this.maximizePanel(container);
      windowData.isMaximize = true;
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

    resizeHandle.addEventListener('mousedown', (e) => {
      this.startResize(e, container, windowData);
    });

    windowHeader.addEventListener('mousedown', (e) => {
      // if (e.target.closet('.window-controls')) return;
      console.log('mousedown', e.target, e.target.closest('.window-controls'));
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

  applyPendingChanges() {
    let panelArray = JSON.parse(localStorage.getItem('windowDataArray')) || [];

    const panelMap = panelArray.reduce((map, panelData) => {
      map[panelData.id] = panelData;
      return map;
    }, {});

    Object.keys(this.pendingChanges).forEach((key) => {
      const panelData = this.pendingChanges[key];
      if (panelData.isClose) {
        delete panelMap[panelData.id];
      } else {
        panelMap[panelData.id] = panelData;
      }
    });

    panelArray = Object.values(panelMap);

    localStorage.setItem('windowDataArray', JSON.stringify(panelArray));
    localStorage.setItem('panelOrder', JSON.stringify(this.panelOrder));
    this.pendingChanges = {};
  }

  startDrag(e, container, panelData) {
    const startX = e.clientX;
    const startY = e.clientY;
    const transform = container.style.transform.match(/-?\d+\.?\d*/g);
    const startLeft = parseFloat(transform[0]);
    const startTop = parseFloat(transform[1]);

    let lastX = startX;
    let lastY = startY;

    const onDrag = (e) => {
      const newX = startLeft + (e.clientX - startX);
      const newY = startTop + (e.clientY - startY);
      container.style.transform = `translate(${newX}px, ${newY}px)`;
      lastX = e.clientX;
      lastY = e.clientY;
      // panelData.x = newX;
      // panelData.y = newY;
      // this.savePendingChanges(panelData);
    };

    const stopDrag = () => {
      panelData.x = parseFloat(
        container.style.transform.match(/-?\d+\.?\d*/g)[0]
      );
      panelData.y = parseFloat(
        container.style.transform.match(/-?\d+\.?\d*/g)[1]
      );
      this.savePendingChanges(panelData);
      document.removeEventListener('mousemove', onDrag);
      document.removeEventListener('mouseup', stopDrag);
    };

    document.addEventListener('mousemove', onDrag);
    document.addEventListener('mouseup', stopDrag);
  }

  startResize(e, container, panelData) {
    const startX = e.clientX;
    const startY = e.clientY;
    const startWidth = container.offsetWidth;
    const startHeight = container.offsetHeight;

    const onResize = (e) => {
      const newWidth = startWidth + (e.clientX - startX);
      const newHeight = startHeight + (e.clientY - startY);
      container.style.width = `${newWidth}px`;
      container.style.height = `${newHeight}px`;
      panelData.width = newWidth;
      panelData.height = newHeight;
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
    const headerHeight = document.querySelector('header').offsetHeight;
    const taskbarHeight = document.querySelector('.taskbar').offsetHeight;
    container.style.width = '100%';
    container.style.height = `calc(100% - ${headerHeight}px - ${taskbarHeight}px)`;
    container.style.transform = 'translate(0, 0)';
  }

  bringToFront(element, panelData) {
    const panelId = element.dataset.id;

    this.panelOrder = this.panelOrder.filter((id) => id !== panelId);
    this.panelOrder.push(panelId);

    const parent = element.parentNode;

    parent.appendChild(element);

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

  updateTaskList(panelData) {
    if (panelData.isClose) return;

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
