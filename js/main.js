import {createTimer} from './timer.js';

const mainEl = document.querySelector('.main');
const timerTemplate = document.querySelector('template#pomo');

mainEl.append(createTimer(timerTemplate));
mainEl.append(createTimer(timerTemplate));
