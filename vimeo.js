var options = {
  id: 827324316,
  width: 1200,
  loop: false,
};

var player = new Vimeo.Player("video-container", options);

player.muted = false;

// Open on play
$("#video-trigger").click(function () {
  player.setVolume(1);
  player.play();
});

// player.on("play", () => {
//   player.setVolume(1);
// });
