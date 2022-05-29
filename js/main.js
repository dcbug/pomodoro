import {Timer} from './timer.js';

const mainEl = document.querySelector('.main');
const timerTemplate = document.querySelector('template#pomo');

const t1 = new Timer(timerTemplate, {color: 'red'});
const t2 = new Timer(timerTemplate, {renderInterval: 5000});

t1.attach(mainEl);
t2.attach(mainEl);
