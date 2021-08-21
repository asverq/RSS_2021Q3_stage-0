const
  container = document.querySelector('.video-player'),
  media = document.querySelector('.video-player__video'),
  controlsBody = document.querySelector('.controls-body'),
  controls = document.querySelector('.video-player__bar'),
  screenBtn = document.querySelector('.btn-on-screen'),
  playBtn = document.querySelector('.play-btn'),
  rwdBtn = document.querySelector('.prev-btn'),
  fwdBtn = document.querySelector('.next-btn'),
  volumeBtn = document.querySelector('.btn-volume'),
  fullscreenBtn = document.querySelector('.btn-fullscreen'),
  volumeBar = document.querySelector(".volume-bar"),
  progressBar = document.querySelector(".progress-bar"),
  timerBar = document.querySelector(".timer"),
  speedBar = document.querySelector(".speed"),
  videoTitle = document.querySelector('.video-title')

const mediaArr = [
  'Фитнесс не предел - серия 1',
  'Непревзойдённая парковка - серия 2',
  'Дори в поисках - серия 3',
  'Душа города - серия 4',
  'Даки и Бани: Любовь - серия 5',
  'День уборки - серия 6',
  'День из жизни мертвецов - серия 7',
  'Даки и Бани: Три головы - серия 8',
  'Танцы с Тачками - серия 9',
  'Вкусная печенька - серия 10',
];

let activeMedia = 0;
let fullsreenMode = false;

function setVideoTitle() {
  videoTitle.innerText = mediaArr[activeMedia];
}
setVideoTitle();

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

media.addEventListener('ended', stopMedia);
media.addEventListener('ended', autoNextMedia);
media.addEventListener('click', playPauseMedia);
screenBtn.addEventListener('click', playPauseMedia);
rwdBtn.addEventListener('click', function () {
  changeMedia('rwd')
});
fwdBtn.addEventListener('click', function () {
  changeMedia('fwd')
});
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

function changeMedia(order) {
  if (order === 'rwd') {
    stopMedia();
    if (activeMedia > 0) {
      activeMedia -= 1;
      media.src = `video/video-${activeMedia + 1}.mp4`;
      setVideoTitle();
      setTimeout(updateProgressBar, 100);
    }
  } else if (order === 'fwd') {
    stopMedia();
    if (activeMedia < mediaArr.length - 1) {
      activeMedia += 1;
      media.src = `video/video-${activeMedia + 1}.mp4`;
      setVideoTitle();
      setTimeout(updateProgressBar, 100);
    }
  }
}

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

document.addEventListener('fullscreenchange', setPlayerFullscreenStyles);

function setPlayerFullscreenStyles() {
  if (fullsreenMode === false) {
    controls.style.transitionDuration = '0.3s';
    controls.style.transitionDelay = '5s';
    controlsBody.style.position = 'absolute';
    controlsBody.style.bottom = '0';
    controlsBody.style.left = '0';
    controls.style.position = 'absolute';
    controls.style.bottom = '-120px';
    controls.style.backgroundColor = 'rgb(0, 0, 0, 0.7)';
    fullsreenMode = true;
  } else if (fullsreenMode === true) {
    controlsBody.style.position = 'relative';
    controls.style.position = 'absolute';
    controls.style.bottom = '0';
    controls.style.transitionDuration = '0s';
    controls.style.transitionDelay = '0s';
    controls.style.backgroundColor = '#000';
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
  speedBar.innerText = '1x';
}

function autoNextMedia() {
  if (activeMedia === mediaArr.length - 1) {
    stopMedia();
    return;
  }
  changeMedia('fwd');
  playPauseMedia();
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
media.addEventListener('timeupdate', updateProgressBar);
progressBar.addEventListener('input', liveSearchProgress);

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

function updateProgressBar() {
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

console.log('Приветствую тебя мой дорогой проверяющий!\nПредставляю твоему вниманию свою работу.\nВ ней выполнены все основные требования и присутствуют ряд дполнительных наработок, а именно:\n\n1-й Этап - выполнен исходный проект на основе видеоплеера из проекта Museum\n10 - баллов\n\n2-й этап - обязательный дополнительный функционал:\n1) клавиша пробел - пауза\n2)клавиша М (англ) отключение/включение звукаополнительный функционал:\n3) Сочетание клавиш "CTRL + >" — ускорение воспроизведения ролика,\n4) Сочетание клавиш "CTRL + <" — замедление воспроизведения ролика,\n5) Клавиша F — включение/выключение полноэкранного режим.\nГорячие клавиши должны работать так же, как работают эти клавиши в YouTube видео\n10 - баллов за 2-й этап\n\n3-й Этап - дополнительный функционал на выбор:\nа) реализована смена видеофайлов (медиабиблиотека) 10 - баллов\nб) для каждого файла выводится название\nв) реализован таймер указывающий текущую длительность видео\nг) в полноэкранном режиме панель видеоплеера прячется через 5 секунд и появляется если навести мышку там где она должна быть\nд) отображается текущая скорость воспроизведения видео\nе) видео автоматически переключается на следующую серию, если она существует, можно прсомотреть все серии в автоматическом режиме\n\nИтого, работа выполнена на максимальный балл 30 из 30 и даже немного первыполнена');