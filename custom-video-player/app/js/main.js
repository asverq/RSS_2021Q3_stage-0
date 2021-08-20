const
  container = document.querySelector('.video-player'),
  media = document.querySelector('.video-player__video'),
  controls = document.querySelector('.video-player__bar'),
  screenBtn = document.querySelector('.btn-on-screen'),
  playBtn = document.querySelector('.play-btn'),
  rwdBtn = document.querySelector('.prev-btn'),
  fwdbtn = document.querySelector('.next-btn'),
  volumeBtn = document.querySelector('.btn-volume'),
  volumeBar = document.querySelector(".volume-bar"),
  progressBar = document.querySelector(".progress-bar");


function playerReady() {
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
playerReady();

media.addEventListener('click', playPauseMedia);
screenBtn.addEventListener('click', playPauseMedia);
playBtn.addEventListener('click', playPauseMedia);
volumeBtn.addEventListener('click', toggleMute);
document.addEventListener('keydown', (e) => {
  if (e.code === 'Space') {
    e.preventDefault();
    playPauseMedia();
  }
});

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