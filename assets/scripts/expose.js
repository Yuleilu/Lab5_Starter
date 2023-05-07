// expose.js
// import {JSConfetti} from './js-confetti.browser.js'
//import JSConfetti from './js-confetti.browser'

window.addEventListener("DOMContentLoaded", init);

function init() {
  const exposeSection = document.getElementById("expose");
  console.log(exposeSection);
  const hornSelect = document.getElementById("horn-select");
  console.log(hornSelect);
  const volumeSlider = document.getElementById("volume");
  const volumeImage = document.getElementById("volume-controls");
  const playButton = document.querySelector("button");
  const audioElement = document.querySelector("audio");

  // Update image and audio based on horn selection
  hornSelect.addEventListener("change", function () {
    const hornImage = exposeSection.querySelector("img");
    const hornSound = `./assets/audio/${this.value}.mp3`;
    const hornImageSrc = `./assets/images/${this.value}.svg`;

    hornImage.src = hornImageSrc;
    audioElement.src = hornSound;
  });

  // Update volume icon and audio volume based on slider value
  volumeSlider.addEventListener("input", function () {
    const volumeValue = this.value;
    audioElement.volume = volumeValue / 100;

    if (volumeValue == 0) {
      volumeImage.src = "./assets/icons/volume-level-0.svg";
      playButton.disabled = true;
    } else if (volumeValue < 33) {
      volumeImage.src = "./assets/icons/volume-level-1.svg";
      playButton.disabled = false;
    } else if (volumeValue < 67) {
      volumeImage.src = "./assets/icons/volume-level-2.svg";
      playButton.disabled = false;
    } else {
      volumeImage.src = "./assets/icons/volume-level-3.svg";
      playButton.disabled = false;
    }
  });

  // playButton.addEventListener('click', function() {
  //   const hornSound = `./assets/audio/${this.value}-horn.mp3`;
  //   const hornImageSrc = `./assets/images/${this.value}-horn.svg`;

  //   hornImage.src = hornImageSrc;
  //   audioElement.src = hornSound;
  //   audioElement.play();

  //   if (this.value === 'party') {
  //     confetti.start();
  //   }
  // });

  // Play sound and shoot confetti if Party Horn is selected
  playButton.addEventListener("click", function () {
    audioElement.currentTime = 0;
    audioElement.play();

    const confetti = new JSConfetti();

    if (hornSelect.value === "party-horn") {
      // confetti({
      //   particleCount: 200,
      //   startVelocity: 40,
      //   spread: 360,
      //   gravity: 1,
      //   origin: {
      //     x: 0.5,
      //     y: 0.6,
      //   },
      // });
      confetti.addConfetti();
    }
  });
}

init();
