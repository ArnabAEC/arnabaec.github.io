const basket = document.getElementById("basket");
const heart = document.getElementById("heart");
const scoreDisplay = document.getElementById("score");

let score = 0;
let basketPosition = 160;
let heartPositionX = Math.random() * 380;
let heartPositionY = 0;

// Move the basket
document.addEventListener("keydown", (event) => {
  if (event.key === "ArrowLeft" && basketPosition > 0) {
    basketPosition -= 20;
  } else if (event.key === "ArrowRight" && basketPosition < 320) {
    basketPosition += 20;
  }
  basket.style.left = basketPosition + "px";
});

// Move the heart down
function moveHeart() {
  heartPositionY += 5;
  heart.style.top = heartPositionY + "px";
  heart.style.left = heartPositionX + "px";

  // Reset the heart if it falls off or is caught
  if (heartPositionY > 580) {
    heartPositionY = 0;
    heartPositionX = Math.random() * 380;
  }

  // Check for collision
  if (
    heartPositionY > 560 &&
    heartPositionX > basketPosition &&
    heartPositionX < basketPosition + 80
  ) {
    score++;
    scoreDisplay.textContent = "Score: " + score;
    heartPositionY = 0;
    heartPositionX = Math.random() * 380;
  }

  requestAnimationFrame(moveHeart);
}

moveHeart();
