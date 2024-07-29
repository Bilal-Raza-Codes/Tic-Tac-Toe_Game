document.addEventListener("DOMContentLoaded", () => {
  //----------------------------------------------------------------Fetching data from HTML-----------------------------------------------------------------------------
  const cells = document.querySelectorAll(".cells");
  const bkgrndMusicBtn = document.querySelector("#musicBtn");
  const bkgrndMusicIcon = document.querySelector("#bkgrndMusicIcon");
  
  //------------------------------------------------------------------Game winning Logic-----------------------------------------------------------------------------
  const winPatterns = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6], // Diagonals
  ];
  
  let gameActive = true; // variable to track the game state
  
  const gameWin = (index) => {
    for (const pattern of winPatterns) {
      const [a, b, c] = pattern;
      if (index === a || index === b || index === c) {  // check whether the cell exist at index
        const cellA = cells[a];
        const cellB = cells[b];
        const cellC = cells[c];
        if (cellA.getAttribute("data-filled") === "true" &&   // ensure that the cell is filled
            cellB.getAttribute("data-filled") === "true" &&
            cellC.getAttribute("data-filled") === "true" &&
            cellA.style.backgroundImage === cellB.style.backgroundImage &&
            cellB.style.backgroundImage === cellC.style.backgroundImage) {
          setBkgrndColors(cellA, cellB, cellC);
          announceWinner(endGame);
          return true;  // Indicates a win
        }
      }
    }
    return false;  // Indicates no win
  };
  
  const setBkgrndColors = (cellA, cellB, cellC) => {
    cells.forEach((cell) => cell.classList.add("cellsAfterWin"));
    [cellA, cellB, cellC].forEach((cell) => {
      cell.classList.remove("cellsAfterWin");
      cell.style.backgroundColor = "#e293cf";
    });
    return;
  };

  const announceWinner = (endGame) => {
    setTimeout(() => {
      alert(`Player ${isCrossTurn ? "O" : "X"} wins!`);
      endGame();
    }, 50);
    return;
  };
  
  const endGame = () => {
    gameActive = false; // Set the game state to inactive
    cells.forEach(cell => cell.removeEventListener("click", handleCellClick));
    return;
  };
  
  
  //------------------------------------------------------------------------Working on Images and Cell click functionality-----------------------------------------------------------------------------
  const cross = new Image();
  cross.src = "Images/cross.png";
  
  const circle = new Image();
  circle.src = "Images/circle.png";
  
  let isCrossTurn = true;
  
  const handleCellClick = (event, index) => {
    if (!gameActive) return; 

    const cell = event.target;
  
    if (cell.getAttribute("data-filled") === "true") {
      return;
    }
  
    cell.style.backgroundImage = `url(${isCrossTurn ? cross.src : circle.src})`;
    cell.style.backgroundRepeat = "no-repeat";
    cell.style.backgroundPosition = "center";
  
    cell.setAttribute("data-filled", "true");
  
    isCrossTurn = !isCrossTurn;
    console.log(`The clicked button is at index ${index}`);
  
    if (gameWin(index)) {
      endGame();
    }
  };
  
  cells.forEach((cell, index) => {
    cell.addEventListener("click", (event) => handleCellClick(event, index));
  });
  

  //------------------------------------------------------------------------Working on Audios-----------------------------------------------------------------------------
  // applying an audio when each cell is clicked
  cells.forEach((cell) => {
    cell.addEventListener("click", () => {
      const audio = new Audio("/audios/button-click.mp3");
      audio.play();
    });
  });

  // applying background music
  let bkgrndMusicStatus = true;
  let bkgrndMusic;
  bkgrndMusic = new Audio("audios/background music.mp3");
  bkgrndMusic.loop = true;
  bkgrndMusic.play();

  // working on button to control background music
  const bkgrndMusiControl = () => {
    if (bkgrndMusicStatus === true) {
      bkgrndMusic.pause(); // use them when you want to use your resources less.
      // bkgrndMusic.muted = true;  // use this for better experiene. continue playing audio in background thus resources use more
      bkgrndMusicIcon.src = "Images/mute.png";
      bkgrndMusicStatus = false;
    } else {
      bkgrndMusic.play(); // use them when you want to use your resources less.
      // bkgrndMusic.muted = false;  // use this for better experiene. continue playing audio in background thus resources use more
      bkgrndMusicIcon.src = "Images/music on.png";
      bkgrndMusicStatus = true;
    }
  };
  bkgrndMusicBtn.addEventListener("click", bkgrndMusiControl);
});

