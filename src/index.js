document.addEventListener('DOMContentLoaded', () => {
  // nav는 nav-menu를 토글할 수 있는 버튼, nav-menu는 토글되는 메뉴
  const nav = document.querySelector('.nav');
  const navMenu = document.querySelector('.nav-menu');

  // new-window는 새 창을 띄우는 버튼, modal은 새 창을 띄우는 모달
  const newWindow = document.getElementById('new-window');
  const modal = document.getElementById('modal');

  const closeButton = document.getElementById('new-window-close');

  const form = document.getElementById('new-window-form');
  
  const closeButton = document.querySelector('.close-button');

  const form = document.getElementById('new-window-form');

  console.log('modal', modal.__proto__);


  if (!modal.showModal) {
    dialogPolyfill.registerDialog(modal);
  }

  // actionRadios는 브라우저와 시계 중 선택할 수 있는 라디오 버튼, windowFields는 브라우저 선택 시 비활성화되는 필드
  const actionRadios = document.querySelectorAll(['input[name="action"]']);
  const windowFields = document.querySelectorAll('#window-content');

  console.log(windowFields);
  const timezoneSelect = document.getElementById('timezone');

  nav.addEventListener('click', (event) => {
    event.stopPropagation();
    navMenu.classList.toggle('nav-menu--visible');

    const menuRect = navMenu.getBoundingClientRect();
    if (menuRect.right > window.innerWidth) {
      navMenu.classList.add('right-aligned');
    }
    if (menuRect.right < window.innerWidth) {
      navMenu.classList.remove('right-aligned');
    }
  });

  document.addEventListener('click', (event) => {
    if (!nav.contains(event.target)) {
      navMenu.classList.remove('nav-menu--visible');
    }
  });

  newWindow.addEventListener('click', (e) => {
    e.stopPropagation();
    modal.showModal();
    navMenu.classList.remove('nav-menu--visible');
  });


  closeButton.addEventListener('click', (e) => {
    e.stopPropagation();
    console.log('close');
    modal.close();
  });

  actionRadios.forEach((radio) => {
    radio.addEventListener('change', (event) => {
      if (event.target.value === 'browser') {
        windowFields.forEach((field) => (field.disabled = false));
        timezoneSelect.disabled = true;
      } else if (event.target.value === 'clock') {
        windowFields.forEach((field) => (field.disabled = true));
        timezoneSelect.disabled = false;
      }
    });
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const action = document.querySelector('input[name="action"]:checked').value;
    const title = document.getElementById('window-title').value;
    const content = document.getElementById('window-content').value;
    const timezone = document.getElementById('timezone').value;

    let newWindowData = {};

    // 1. 이벤트 리스너에서 분리
    // 2. 메소드에서 분리

    newWindowData = { action, title, content, timezone };

    localStorage.setItem('newWindowData', JSON.stringify(newWindowData));

    createNewWindow(newWindowData);
    updateTaskList(newWindowData);

    modal.close();
  });
});

const createNewWindow = (newWindowData) => {
  const main = document.querySelector('main');
  const container = document.createElement('section');

  container.classList.add('window');

  container.innerHTML = `
    <div class='window-header'>
      ${newWindowData.title}
      <div class='window-controls'>
        <button class='maximize-button'>&#43;</button>
        <button class='minimize-button'>&#45;</button>
        <button class='close-button'>X</button>
      </div>
    `;

  const maximizeButton = container.querySelector('.maximize-button');
  const minimizeButton = container.querySelector('.minimize-button');
  const closeButton = container.querySelector('.close-button');

  maximizeButton.addEventListener('click', () => {});

  minimizeButton.addEventListener('click', () => {});

  closeButton.addEventListener('click', () => {});

  main.appendChild(container);
};

const updateTaskList = (newWindowData) => {
  const taskList = document.querySelector('.taskbar-items');
  const task = document.createElement('li');
  task.classList.add('taskbar-item');
  task.innerHTML = `
    <span>${newWindowData.title}</span>
  `;

  taskList.appendChild(task);
};

Object.keys(localStorage).forEach((key) => {
  console.log('key', key);
  if (key.startsWith('newWindow')) {
    const data = JSON.parse(localStorage.getItem(key));
    createNewWindow(data);
    updateTaskList(data);
  }
});

