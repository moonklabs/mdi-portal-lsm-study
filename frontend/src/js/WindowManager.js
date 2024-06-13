import EventManager from './EventManager.js';
import PanelManager from './PanelManager.js';
import StorageManager from './StorageManager.js';

class WindowManager {
  constructor() {
    this.panelOrder = [];
    this.pendingChanges = {};
    this.eventManager = new EventManager(this);
    this.panelManager = new PanelManager(this);
    this.storageManager = new StorageManager(this);
    this.init();
  }

  init() {
    this.eventManager.init();
    this.storageManager.loadPanelsFromStorage();
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

    this.panelManager.createPanel(windowData);
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
      } else {
        panel.style.display = 'flex';
        this.pendingChanges[panelId].isHide = false;
        this.bringToFront(panel, this.pendingChanges[panelId]);
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
    this.storageManager.applyPendingChanges();
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

      const id = panel.dataset.id;
      this.pendingChanges[id] = {
        ...this.pendingChanges[id],
        x: leftOffset,
        y: topOffset,
        width: panelWidth,
        height: panelHeight,
      };

      col++;
      if (col >= numCols) {
        col = 0;
        leftOffset = 0;
        topOffset += panelHeight;
      } else {
        leftOffset += panelWidth;
      }
    });
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
      panel.style.width = `${panelWidth}px`;
      panel.style.height = `${panelHeight}px`;
      panel.style.transform = `translate(${startX + index * stackOffset}px, ${
        startY + index * stackOffset
      }px)`;

      const id = panel.dataset.id;
      this.pendingChanges[id] = {
        ...this.pendingChanges[id],
        x: startX + index * stackOffset,
        y: startY + index * stackOffset,
        width: panelWidth,
        height: panelHeight,
      };
    });
  }

  savePendingChanges(panelData) {
    this.pendingChanges[`${panelData.id}`] = panelData;
  }

  applyPendingChanges() {
    this.storageManager.applyPendingChanges();
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
    const main = document.querySelector('main');

    container.style.width = `${main.clientWidth}px`;
    container.style.height = `${main.clientHeight}px`;
    container.style.transform = 'translate(0, 0)';
  }

  bringToFront(element) {
    const parent = element.parentNode;

    parent.appendChild(element);

    this.panelOrder = Array.from(parent.querySelectorAll('section.window')).map(
      (section) => section.dataset.id
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
