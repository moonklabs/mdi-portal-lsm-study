export default class PanelManager {
  constructor(windowManager) {
    this.windowManager = windowManager;
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
      <div class='resize-handle'></div>
    `;

    this.addPanelEventListeners(container, windowData);

    if (windowData.isHide) container.style.display = 'none';
    container.style.width = `${windowData.width}px`;
    container.style.height = `${windowData.height}px`;
    if (windowData.isMaximize) {
      this.windowManager.maximizePanel(container);
    }

    container.style.transform = `translate(${windowData.x}px, ${windowData.y}px)`;
    main.appendChild(container);

    if (windowData.action === 'clock') {
      this.windowManager.displayClock(
        container.querySelector('.clock'),
        windowData.timezone
      );
    }
  }

  addPanelEventListeners(container, windowData) {
    const maximizeButton = container.querySelector('.maximize-button');
    const minimizeButton = container.querySelector('.minimize-button');
    const closeButton = container.querySelector('.close-button');
    const resizeHandle = container.querySelector('.resize-handle');
    const windowHeader = container.querySelector('.window-header-bar');

    maximizeButton.addEventListener('click', () => {
      this.windowManager.maximizePanel(container, windowData);
      windowData.isMaximize = true;
      windowData.x = 0;
      windowData.y = 0;

      this.windowManager.savePendingChanges(windowData);
    });

    minimizeButton.addEventListener('click', () => {
      container.style.display = 'none';
      windowData.isHide = true;
      this.windowManager.savePendingChanges(windowData);
    });

    closeButton.addEventListener('click', (e) => {
      e.stopPropagation;
      container.remove();
      windowData.isClose = true;
      this.windowManager.removeTaskFromList(windowData.title);
      this.windowManager.removeFromPanelOrder(windowData.id);
      this.windowManager.savePendingChanges(windowData);
    });

    resizeHandle.addEventListener('mousedown', (e) => {
      this.windowManager.startResize(e, container, windowData);
    });

    windowHeader.addEventListener('mousedown', (e) => {
      this.windowManager.startDrag(e, container, windowData);
      this.windowManager.bringToFront(container, windowData);
    });

    windowHeader.addEventListener('dblclick', () => {
      this.windowManager.maximizePanel(container);
      windowData.isMaximize = true;
      this.windowManager.savePendingChanges(windowData);
    });
  }
}
