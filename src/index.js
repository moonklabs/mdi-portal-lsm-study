document.addEventListener('DOMContentLoaded', () => {
  // nav는 nav-menu를 토글할 수 있는 버튼, nav-menu는 토글되는 메뉴
  const nav = document.querySelector('.nav');
  const navMenu = document.querySelector('.nav-menu');

  // new-window는 새 창을 띄우는 버튼, modal은 새 창을 띄우는 모달
  const newWindow = document.getElementById('new-window');
  const modal = document.getElementById('modal');
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

  closeButton.addEventListener('click', () => {
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
