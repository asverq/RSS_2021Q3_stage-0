$(function () {});

const progress = document.querySelector(".progress-bar");

progress.addEventListener("input", function () {
  const value = this.value;
  this.style.background = `linear-gradient(to right, #24809E 0%, #24809E ${value}%, #fff ${value}%, white 100%)`;
});

const progress2 = document.querySelector(".volume-bar");

progress2.addEventListener("input", function () {
  const value = this.value;
  this.style.background = `linear-gradient(to right, #24809E 0%, #24809E ${value}%, #fff ${value}%, white 100%)`;
});
