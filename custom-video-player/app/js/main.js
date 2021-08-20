const
  container = document.querySelector('.video-player'),
  media = document.querySelector('.video-player__video'),
  controls = document.querySelector('.video-player__bar'),
  screenBtn = document.querySelector('.btn-on-screen'),
  playBtn = document.querySelector('.play-btn'),
  rwdBtn = document.querySelector('.prev-btn'),
  fwdbtn = document.querySelector('.next-btn'),
  volumeBtn = document.querySelector('.btn-volume'),
  fullscreenBtn = document.querySelector('.btn-fullscreen'),
  volumeBar = document.querySelector(".volume-bar"),
  progressBar = document.querySelector(".progress-bar"),
  timerBar = document.querySelector(".timer"),
  speedBar = document.querySelector(".speed")

let fullsreenMode = false;

function setPlayerReady() {
  media.volume = volumeBar.value;
  volumeBar.style.background = `
    linear-gradient(
      to right,
      #24809E 0%,
      #24809E ${volumeBar.value * 100}%,
      #C4C4C4 ${volumeBar.value * 100}%,
      #C4C4C4 100%
    )
  `;
}
setPlayerReady();

let isShiftDown = false;

media.addEventListener('ended', stopMedia)
media.addEventListener('click', playPauseMedia);
screenBtn.addEventListener('click', playPauseMedia);
playBtn.addEventListener('click', playPauseMedia);
volumeBtn.addEventListener('click', toggleMute);
fullscreenBtn.addEventListener('click', toggleFullScreen)
document.addEventListener('keydown', (e) => {
  if (e.code === 'Space') {
    e.preventDefault();
    playPauseMedia();
  }
  if (e.code === 'KeyF') {
    e.preventDefault();
    toggleFullScreen();
  }
  if (e.code === 'KeyM') {
    e.preventDefault();
    toggleMute();
  }
  if (e.code === 'ShiftLeft' || e.code === 'ShiftRight') {
    e.preventDefault();
    isShiftDown = true;
  }
  if (e.code === 'Period' && isShiftDown === true) {
    e.preventDefault();
    speedPlay('up');
  }
  if (e.code === 'Comma' && isShiftDown === true) {
    e.preventDefault();
    speedPlay('down');
  }
});

document.addEventListener('keyup', (e) => {
  if (e.code === 'ShiftLeft' || e.code === 'ShiftRight') {
    e.preventDefault();
    isShiftDown = false;
  }
})

function speedPlay(arg) {
  if (arg === 'up') {
    if (media.playbackRate < 2.5) {
      media.playbackRate += 0.25;
      speedBar.innerText = `${media.playbackRate}x`;
    }
  }
  if (arg === 'down') {
    if (media.playbackRate > 0.25) {
      media.playbackRate -= 0.25;
      speedBar.innerText = `${media.playbackRate}x`;
    }
  }
}

document.addEventListener('fullscreenchange', setPlayerStyles);

function setPlayerStyles() {
  if (fullsreenMode === false) {
    controls.style.position = 'absolute';
    controls.style.bottom = '0';
    fullsreenMode = true;
  } else {
    controls.style.position = 'relative';
    fullsreenMode = false;
  }
}

function toggleFullScreen() {
  if (!document.fullscreenElement) {
    container.requestFullscreen();
  } else if (document.exitFullscreen) {
    document.exitFullscreen();
  }
}

function playPauseMedia() {
  if (media.paused) {
    playBtn.children[0].setAttribute('class', '_icon-pause-btn icon');
    screenBtn.style.display = 'none';
    media.play();
  } else {
    playBtn.children[0].setAttribute('class', '_icon-play-btn icon');
    screenBtn.style.display = 'block';
    media.pause();
  }
}

function stopMedia() {
  media.currentTime = 0;
  playBtn.children[0].setAttribute('class', '_icon-play-btn icon');
  screenBtn.style.display = 'block';
}

function toggleMute() {
  if (media.muted) {
    volumeBtn.children[0].setAttribute('class', '_icon-volume-btn icon');
    media.muted = false;
  } else {
    volumeBtn.children[0].setAttribute('class', '_icon-volume-btn_mute icon');
    media.muted = true;
  }
}

//progress bar logics
media.addEventListener('timeupdate', liveProgressBar);
progressBar.addEventListener("input", liveSearchProgress);

function liveSearchProgress() {
  const value = this.value;
  media.currentTime = (value * media.duration) / 100;
  this.style.background = `
    linear-gradient(
      to right,
      #24809E 0%,
      #24809E ${value}%,
      #C4C4C4 ${value}%,
      #C4C4C4 100%
    )
  `;
}

function timer() {
  const minutes = Math.floor(media.currentTime / 60);
  const hours = Math.floor(minutes / 60) % 24;
  const seconds = Math.floor(media.currentTime % 60);
  timerBar.innerText = `${
    String(hours).padStart('2', '0')
  }:${
    String(minutes).padStart('2', '0')
  }:${
    String(seconds).padStart('2', '0')
  }`;
}

function liveProgressBar() {
  const position = (media.currentTime / media.duration) * 100;
  progressBar.value = position;
  progressBar.style.background = `
    linear-gradient(
      to right,
      #24809E 0%,
      #24809E ${position}%,
      #C4C4C4 ${position}%,
      #C4C4C4 100%
    )
  `;
  timer();
}

volumeBar.addEventListener("input", setVolume);

function setVolume() {
  const value = this.value;
  media.volume = value;
  this.style.background = `
    linear-gradient(
      to right,
      #24809E 0%,
      #24809E ${value * 100}%,
      #C4C4C4 ${value * 100}%,
      #C4C4C4 100%
    )
  `;
}