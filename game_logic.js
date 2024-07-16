const cells = document.querySelectorAll(".cells");  // storing cells class in a var.

// applying an audio when each cell is clicked
cells.forEach(cell => {
  cell.addEventListener("click", () => {
    const audio = new Audio("/audios/button-click.mp3");
    audio.play();});
});

// applying background music 
  document.addEventListener("DOMContentLoaded", () => {
    const bkgrndMusic = new Audio("/audios/background music.mp3");
    bkgrndMusic.loop = true;
    bkgrndMusic.play();
  });

