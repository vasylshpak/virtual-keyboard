import {
  keyCode,
  keysArray,
  keyArrayShift,
  KeyArrRus,
  KeyArrRusShift,
  capsLock,
  capsLockRus,
} from './src/keys.js';
import { createKeyboard } from './src/render.js';

document.body.onkeydown = function (e) {
  if (
    e.keyCode === 9
    || e.keyCode === 18
    || e.keyCode === 32
    || e.keyCode === 38
    || e.keyCode === 40
  ) { return false; }
};
document.querySelector('body').innerHTML = '<textarea readonly> </textarea> <div class="box"></div> <h2> Ctrl + X CLEAR <h2><h2> Alt+Shift SWITCH LANGUAGE<h2>';

let checkLanguage = localStorage.getItem('key');
checkLanguage === '0' ? createKeyboard(keysArray) : createKeyboard(KeyArrRus);
let checkCapsLock = 0;
let shiftCheck = 0;
let isShift = false;
let isCtrl = false;
let language = [keysArray, keyArrayShift];

document.addEventListener('keydown', (event) => {
  if (event.key === 'Alt') {
    isShift = true;
  }
  if (event.key === 'Shift' && isShift) {
    isShift = false;
    shiftCheck = 0;
    if (checkLanguage === '0') {
      language = [KeyArrRus, KeyArrRusShift];
      localStorage.setItem('key', '1');
      checkLanguage = localStorage.getItem('key');
    } else {
      language = [keysArray, keyArrayShift];
      localStorage.setItem('key', '0');
      checkLanguage = localStorage.getItem('key');
    }
    createKeyboard(language[0]);
  } else if (event.key === 'Shift' && shiftCheck === 0) {
    createKeyboard(language[1]);
    shiftCheck = 1;
  } else if (event.key === 'Shift' && shiftCheck === 1) {
    createKeyboard(language[0]);
    shiftCheck = 0;
  }
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'CapsLock' && shiftCheck === 0 && checkLanguage === '0') {
    if (checkCapsLock === 0) {
      createKeyboard(capsLock);
      checkCapsLock = 1;
    } else if (checkCapsLock === 1) {
      createKeyboard(keysArray);
      checkCapsLock = 0;
    }
  } else if (
    event.key === 'CapsLock'
    && shiftCheck === 0
    && checkLanguage === '1'
  ) {
    if (checkCapsLock === 0) {
      createKeyboard(capsLockRus);
      checkCapsLock = 1;
    } else if (checkCapsLock === 1) {
      createKeyboard(KeyArrRus);
      checkCapsLock = 0;
    }
  }
});

document.addEventListener('keydown', (event) => {
  const arr = document.querySelector('textarea').value.split('');
  for (const i in keyCode) {
    if (event.code === keyCode[i]) {
      document.querySelectorAll('.key-element')[i].classList.add('active');
      switch (event.code) {
        case 'Backspace':

          arr.splice(arr.length - 1, 1);
          document.querySelector('textarea').value = arr.join('');
          break;
        case 'ControlLeft':
        case 'ShiftLeft':
        case 'MetaLeft':
        case 'CapsLock':
        case 'AltLeft':
        case 'ShiftRight':
        case 'AltRight':
        case 'ControlRight':
          break;
        case 'Tab':
          document.querySelector('textarea').value += '\t';
          break;
        case 'Enter':
          document.querySelector('textarea').value += '\n';
          break;
        case 'ArrowLeft':
          document.querySelector('textarea').value += '←';
          break;
        case 'ArrowRight':
          document.querySelector('textarea').value += '→';
          break;
        case 'ArrowUp':
          document.querySelector('textarea').value += '↑';
          break;
        case 'ArrowDown':
          document.querySelector('textarea').value += '↓';
          break;
        default:
          document.querySelector('textarea').value += document.querySelectorAll(
            '.key-element',
          )[i].textContent;
      }
    }
  }
});

document.addEventListener('keyup', (event) => {
  for (const i in keyCode) {
    if (event.code === keyCode[i]) {
      document.querySelectorAll('.key-element')[i].classList.remove('active');
    }
  }
});

document.addEventListener('keydown', (event) => {
  if (event.code === 'ControlLeft') {
    isCtrl = true;
  }
  if (event.code === 'KeyX' && isCtrl) {
    isCtrl = false;
    document.querySelector('textarea').value = ' ';
  }
});
const arr = document.querySelector('textarea').value.split('');
document.addEventListener('mousedown', (event) => {
  if (event.target.classList.contains('key-element')) {
    event.target.classList.add('active');
    switch (event.target.textContent) {
      case 'Backspace':

        arr.splice(arr.length - 1, 1);
        document.querySelector('textarea').value = arr.join('');
        break;
      case ' Ctrl ':
        break;
      case 'Shift':
        if (shiftCheck === 0) {
          createKeyboard(language[1]);
          shiftCheck = 1;
        } else if (shiftCheck === 1) {
          createKeyboard(language[0]);
          shiftCheck = 0;
        }
        break;
      case ' Win ':
        document.querySelector('textarea').value = document.querySelector(
          'textarea',
        ).value;
        break;
      case 'CapsLock':
        if (shiftCheck === 0 && checkLanguage === '0') {
          if (checkCapsLock === 0) {
            createKeyboard(capsLock);
            checkCapsLock = 1;
          } else if (checkCapsLock === 1) {
            createKeyboard(keysArray);
            checkCapsLock = 0;
          }
        } else if (shiftCheck === 0 && checkLanguage === '1') {
          if (checkCapsLock === 0) {
            createKeyboard(capsLockRus);
            checkCapsLock = 1;
          } else if (checkCapsLock === 1) {
            createKeyboard(KeyArrRus);
            checkCapsLock = 0;
          }
        }
        break;
      case 'Tab':
        document.querySelector('textarea').value += '\t';
        break;
      case 'Alt':
        break;
      case 'Enter':
        document.querySelector('textarea').value += '\n';
        break;
      case '◄':
        document.querySelector('textarea').value += '←';
        break;
      case '►':
        document.querySelector('textarea').value += '→';
        break;
      case '▲':
        document.querySelector('textarea').value += '↑';
        break;
      case '▼':
        document.querySelector('textarea').value += '↓';
        break;
      default:
        document.querySelector('textarea').value += event.target.textContent;
    }
  }
});
document.addEventListener('mouseup', (event) => {
  if (event.target.classList.contains('key-element')) {
    event.target.classList.remove('active');
  }
});
