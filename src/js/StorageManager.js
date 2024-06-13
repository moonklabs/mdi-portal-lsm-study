export default class StorageManager {
  constructor(windowManager) {
    this.windowManager = windowManager;
  }

  loadPanelsFromStorage() {
    const panelArray =
      JSON.parse(localStorage.getItem('windowDataArray')) || [];
    this.windowManager.panelOrder =
      JSON.parse(localStorage.getItem('panelOrder')) || [];

    console.log('loadPanelsFromStorage', this.windowManager.panelOrder);

    if (this.windowManager.panelOrder.length !== 0) {
      this.windowManager.panelOrder.forEach((panelId) => {
        const panelData = this.findPanelById(panelArray, panelId);
        if (panelData) {
          console.log(this.windowManager.panelManager);
          this.windowManager.panelManager.createPanel(panelData);
          this.windowManager.updateTaskList(panelData);
          this.windowManager.pendingChanges[panelData.id] = panelData;
        }
      });
    } else {
      panelArray.forEach((panelData) => {
        this.windowManager.createPanel(panelData);
        this.windowManager.updateTaskList(panelData);
        this.windowManager.pendingChanges[panelData.id] = panelData;
      });
    }
  }

  findPanelById(panelArray, panelId) {
    return panelArray.find((data) => data.id === parseInt(panelId));
  }

  applyPendingChanges() {
    let panelArray = JSON.parse(localStorage.getItem('windowDataArray')) || [];

    const panelMap = panelArray.reduce((map, panelData) => {
      map[panelData.id] = panelData;
      return map;
    }, {});

    Object.keys(this.windowManager.pendingChanges).forEach((key) => {
      const panelData = this.windowManager.pendingChanges[key];
      if (panelData.isClose) {
        delete panelMap[panelData.id];
      } else {
        panelMap[panelData.id] = panelData;
      }
    });

    panelArray = Object.values(panelMap);

    localStorage.setItem('windowDataArray', JSON.stringify(panelArray));
    localStorage.setItem(
      'panelOrder',
      JSON.stringify(this.windowManager.panelOrder)
    );
    this.windowManager.pendingChanges = {};
  }
}
