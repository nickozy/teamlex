const options = {
  id: 827324316,
  width: 1200,
  loop: false,
};

var player = new Vimeo.Player("video-container", options);

player.muted = false;
player.setVolume(1);
const btn = document.querySelector(".video-button");
const container = document.querySelector(".video-wrapper");

// Open on play
btn.addEventListener("click", () => {
  container.classList.toggle("play");

  if (container.classList.contains("play") == true) {
    player.play();
  } else {
    player.pause();
  }
});

//
//
////
//////
////////

// const callback = (entries, observer) => {
//   entries.forEach((entry) => {
//     if (entry.isIntersecting) {
//       console.log(entry.isIntersecting);

//       observer.unobserve(entry.target);
//     } else {
//       console.log("Элемент пропал с поля видимости");
//     }
//   });
// };

const video = document.querySelector("[data-video]");
const callback = (entry) => {
  if (entry[0].isIntersecting === false) {
    player.pause();
    container.classList.remove("play");
  }
};
const observer = new IntersectionObserver(callback);

observer.observe(video);
