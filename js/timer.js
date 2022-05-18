import {Component} from './component.js';

export class Timer extends Component {
  static POMO_INTERVAL = 25 * 60 * 1000;
  static POMO_MIN = '25';
  static POMO_SEC = '00';
  static DEFAULT_RENDER_INTERVAL = 100;
  
  static addZero(num) {
    return `0${num}`.slice(-2);
  }

  constructor(template, options = {}) { 
    super();
    this._el = template.content.querySelector('.pomo').cloneNode(true);
    this._pomoMinElem = this._el.querySelector('.pomo__min');
    this._pomoSecElem = this._el.querySelector('.pomo__sec');
    this._playBtn = this._el.querySelector('.play__button');
    this._timeLeft = Timer.POMO_INTERVAL;
    this._lastStartTimestamp = undefined;
    this._interval = undefined;
    this._state = 'paused';
    this._playBtn.addEventListener('click',       
    this._handleChangeTimerState.bind(this));
    this._renderInterval = options.renderInterval || Timer.DEFAULT_RENDER_INTERVAL;
    this._el.style.color = options.color;
  }

  remove() {
    super.remove();
    this.log('Hooray! Timer is removed!');
  }

  get state() {
    return this._state;
  }

  log() {
    console.log('Timer: ', ...arguments);
    // method chaining
    return this;
  }
  
  _renderTimer() {
    const msPassedSinceStart = Date.now() - this._lastStartTimestamp;
    const currentTimestamp = this._timeLeft - msPassedSinceStart;
    const renderDate = new Date(currentTimestamp);
  
    if (currentTimestamp <= 0) {
      this._pomoMinElem.textContent = `${Timer.POMO_MIN}`;
      this._pomoSecElem.textContent = `${Timer.POMO_SEC}`;
      
      this._playBtn.classList.toggle('play__button_state-active');
      this._playBtn.classList.toggle('play__button_state-paused');
  
      this._state = 'paused';
      this._timeLeft = Timer.POMO_INTERVAL;
      clearInterval(this._interval);
      
      return;
    }
    
    const minutes = renderDate.getMinutes();
    const seconds = renderDate.getSeconds();
    
    this._pomoMinElem.textContent = Timer.addZero(minutes);
    this._pomoSecElem.textContent = Timer.addZero(seconds);
  }

  _handleChangeTimerState() {
    switch (this._state) {
      case 'active':
        this._state = 'paused';
        const msPassedSinceStart = Date.now() - this._lastStartTimestamp;
        this._timeLeft -= msPassedSinceStart;
        clearInterval(this._interval);
        break;
      case 'paused':
        this._lastStartTimestamp = Date.now();
        this._state = 'active';
        this._interval = setInterval(this._renderTimer.bind(this), this._renderInterval);
        break;
      default:
        break;
    }
    
    this._playBtn.classList.toggle('play__button_state-active');
    this._playBtn.classList.toggle('play__button_state-paused');
  }
}
