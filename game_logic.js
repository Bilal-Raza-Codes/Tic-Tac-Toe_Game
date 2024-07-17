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


// Store the images in Image objects
const cross = new Image();
cross.src = "Images/cross.png";

const circle = new Image();
circle.src = "Images/circle.png";

// Track the current player (true for cross, false for circle)
let isCrossTurn = true;

// Function to handle button click
function handleCellClick(event) {
  const cell = event.target;

  // Check if the cell is already filled
  if (cell.getAttribute('data-filled') === 'true') {
    return;
  }

  // Set the image based on the current player's turn
  if (isCrossTurn) {
    cell.style.backgroundImage = `url(${cross.src})`;
    cell.style.backgroundRepeat = 'no-repeat';
    cell.style.backgroundPosition = 'center';
  } else {
    cell.style.backgroundImage = `url(${circle.src})`;
    cell.style.backgroundRepeat = 'no-repeat';
    cell.style.backgroundPosition = 'center';
  }

  // Mark the cell as filled
  cell.setAttribute('data-filled', 'true');

  // Toggle the turn
  isCrossTurn = !isCrossTurn;
}

// Get all buttons (cells) and add event listeners
cells.forEach(cell => {
  cell.addEventListener('click', handleCellClick);
});
