export default class EventManager {
  constructor(windowManager) {
    this.windowManager = windowManager;
  }

  init() {
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
        this.windowManager.toggleNavMenu(event, navMenu, nav)
      );
      document.addEventListener('click', (event) =>
        this.windowManager.closeNavMenu(event, navMenu, nav)
      );
      newWindow.addEventListener('click', (e) =>
        this.windowManager.openModal(e, modal, navMenu)
      );
      closeButton.addEventListener('click', (e) =>
        this.windowManager.closeModal(e, modal)
      );
      form.addEventListener('submit', (e) =>
        this.windowManager.handleFormSubmit(e, modal)
      );
      saveButton.addEventListener('click', () =>
        this.windowManager.applyPendingChanges()
      );
      taskList.addEventListener('click', (event) =>
        this.windowManager.handleTaskItemClick(event)
      );

      document
        .querySelector('.nav-item:nth-child(2)')
        .addEventListener('click', () =>
          this.windowManager.minimizeAllPanels()
        );
      document
        .querySelector('.nav-item:nth-child(3)')
        .addEventListener('click', () => this.windowManager.restoreAllPanels());
      document
        .querySelector('.nav-item:nth-child(4)')
        .addEventListener('click', () =>
          this.windowManager.arrangePanels('grid')
        );
      document
        .querySelector('.nav-item:nth-child(5)')
        .addEventListener('click', () =>
          this.windowManager.arrangePanels('stack')
        );

      document.querySelectorAll(['input[name="action"]']).forEach((radio) => {
        radio.addEventListener('change', (event) =>
          this.windowManager.handleActionChange(event)
        );
      });
    });
  }
}
