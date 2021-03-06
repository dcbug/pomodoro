const pomoMinElem = document.querySelector('.pomo__min');
const pomoSecElem = document.querySelector('.pomo__sec');
const playBtn = document.querySelector('.play__button');

const POMO_INTERVAL = 25 * 60 * 1000;
const POMO_MIN = new Date(POMO_INTERVAL).getMinutes();
const POMO_SEC = new Date(POMO_INTERVAL).getSeconds();

let interval, lastStartTimestamp;
let state = 'paused';
let timeLeft = POMO_INTERVAL;

const addZero = (num) => {
  return `0${num}`.slice(-2);
};

const renderTimer = () => {
  const msPassedSinceStart = Date.now() - lastStartTimestamp;
  const currentTimestamp = timeLeft - msPassedSinceStart;
  const renderDate = new Date(currentTimestamp);

  if (currentTimestamp <= 0) {
    pomoMinElem.textContent = `${POMO_MIN}`;
    pomoSecElem.textContent = `${POMO_SEC}`;
    
    playBtn.classList.toggle('play__button_state-active');
    playBtn.classList.toggle('play__button_state-paused');

    state = 'paused';
    timeLeft = POMO_INTERVAL;
    clearInterval(interval);
    
    return;
  }
  
  const minutes = renderDate.getMinutes();
  const seconds = renderDate.getSeconds();
  
  pomoMinElem.textContent = addZero(minutes);
  pomoSecElem.textContent = addZero(seconds);
};

const handleChangeTimerState = () => {
  switch (state) {
    case 'active':
      state = 'paused';
      const msPassedSinceStart = Date.now() - lastStartTimestamp;
      timeLeft -= msPassedSinceStart;
      clearInterval(interval);
      break;
    case 'paused':
      lastStartTimestamp = Date.now();
      state = 'active';
      interval = setInterval(renderTimer, 100);
      break;
    default:
      break;
  }
  
  playBtn.classList.toggle('play__button_state-active');
  playBtn.classList.toggle('play__button_state-paused');
};

playBtn.addEventListener('click', handleChangeTimerState);