const basket = document.getElementById("basket");
const heart = document.getElementById("heart");
const scoreDisplay = document.getElementById("score");

let score = 0;
let basketPosition = 50; // Percentage-based position
let heartPositionX = Math.random() * 90;
let heartPositionY = 0;
const basketWidth = 20; // Percentage width of the basket
const heartWidth = 6; // Percentage width of the heart

// Move the basket with arrow keys
document.addEventListener("keydown", (event) => {
  if (event.key === "ArrowLeft" && basketPosition > 5) {
    basketPosition -= 5;
  } else if (event.key === "ArrowRight" && basketPosition < 75) {
    basketPosition += 5;
  }
  basket.style.left = basketPosition + "%";
});

// Mobile touch controls
document.addEventListener("touchmove", (event) => {
  let touchX = event.touches[0].clientX;
  let gameArea = document.getElementById("game-area").getBoundingClientRect();
  basketPosition = ((touchX - gameArea.left) / gameArea.width) * 100;
  basketPosition = Math.max(5, Math.min(75, basketPosition));
  basket.style.left = basketPosition + "%";
});

// Move heart down
function moveHeart() {
  heartPositionY += 2;
  heart.style.top = heartPositionY + "%";
  heart.style.left = heartPositionX + "%";

  // Reset heart if it falls off
  if (heartPositionY > 95) {
    heartPositionY = 0;
    heartPositionX = Math.random() * 90;
  }

  // **Fixed Collision Detection:**
  let basketLeft = basketPosition;
  let basketRight = basketPosition + basketWidth;
  let heartLeft = heartPositionX;
  let heartRight = heartPositionX + heartWidth;

  if (heartPositionY > 90 && heartRight > basketLeft && heartLeft < basketRight) {
    score++;
    scoreDisplay.textContent = "Score: " + score;
    heartPositionY = 0;
    heartPositionX = Math.random() * 90;
  }

  requestAnimationFrame(moveHeart);
}

moveHeart();
