
// Game initialization
const gameContainer = document.getElementById('game-container');
const canvasWidth = 800;
const canvasHeight = 600;
gameContainer.style.width = canvasWidth + 'px';
gameContainer.style.height = canvasHeight + 'px';

// Player variables
let playerX = 50;
let playerY = canvasHeight - 100;
const playerWidth = 50;
const playerHeight = 50;
const playerSpeed = 5;
let isJumping = false;
let jumpHeight = 100;
let jumpCount = 0;

// Obstacle variables
const obstacleMinHeight = 50;
const obstacleMaxHeight = 150;
const obstacleSpeed = 3;
let obstacles = [];

// Game variables
let score = 0;
let lives = 3;

const scoreDisplay = document.getElementById('score');
const livesDisplay = document.getElementById('lives');

// Player controls
document.addEventListener('keydown', handleKeyDown);

function handleKeyDown(event) {
  if ((event.key === 'Space' || event.key === 'ArrowUp' || event.key === 'w') && !isJumping) {
    isJumping = true;
    jumpCount = 0;
  } else if (event.key === 'ArrowUp' || event.key === 'w') {
    if (playerY > 0) {
      playerY -= playerSpeed;
    }
  } else if (event.key === 'ArrowDown' || event.key === 's') {
    if (playerY < canvasHeight - playerHeight) {
      playerY += playerSpeed;
    }
  }
}

// Game loop
function gameLoop() {
  update();
  render();

  requestAnimationFrame(gameLoop);
}

// Collision detection
function checkCollision() {
  for (let i = 0; i < obstacles.length; i++) {
    const obstacle = obstacles[i];
    if (
      playerX < obstacle.x + obstacle.width &&
      playerX + playerWidth > obstacle.x &&
      playerY < obstacle.y + obstacle.height &&
      playerY + playerHeight > obstacle.y
    ) {
      // Collision detected
      lives -= 1 / 3;
      livesDisplay.textContent = 'Lives: ' + Math.ceil(lives);

      if (lives <= 0) {
        // Game over
        endGame();
      }
    }
  }
}

// Scoring system
function updateScore() {
  score++;
  scoreDisplay.textContent = 'Score: ' + score;
  if( score >= 1000){

window.location.href= "youwon.html"
  }
}

// Game over
function endGame() {
  // Stop the game, show game over message, etc.
  console.log('Game Over');
  
  window.location.href= "youlost.html"
}

// Generate obstacles
function generateObstacle() {
  const obstacleHeight = Math.floor(Math.random() * (obstacleMaxHeight - obstacleMinHeight + 1)) + obstacleMinHeight;
  const obstacleY = Math.random() * (canvasHeight - obstacleHeight);
  const obstacle = {
    x: canvasWidth,
    y: obstacleY,
    width: 50,
    height: obstacleHeight
  };
  obstacles.push(obstacle);
}

// Update game state
function update() {
  // Update player position
  if (isJumping) {
    playerY -= playerSpeed;
    jumpCount++;

    if (jumpCount === jumpHeight) {
      isJumping = false;
    }
  } else {
    if (playerY < canvasHeight - playerHeight) {
      playerY += playerSpeed;
    }
  }

  // Update obstacle positions
  for (let i = 0; i < obstacles.length; i++) {
    const obstacle = obstacles[i];
    obstacle.x -= obstacleSpeed;

    if (obstacle.x + obstacle.width < 0) {
      // Remove obstacle if it goes off-screen
      obstacles.splice(i, 1);
      i--;
    }
  }

  // Generate obstacles randomly
  if (Math.random() < 0.02) {
    generateObstacle();
  }

  checkCollision();
  updateScore();
}

// Render game elements
function render() {
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');
  canvas.width = canvasWidth;
  canvas.height = canvasHeight;

  // Clear canvas
  context.clearRect(0, 0, canvasWidth, canvasHeight);

  // Draw player
  context.fillStyle = 'blue';
  context.fillRect(playerX, playerY, playerWidth, playerHeight);

  // Draw obstacles
  context.fillStyle = 'red';
  for (let i = 0; i < obstacles.length; i++) {
    const obstacle = obstacles[i];
    context.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);
  }

  gameContainer.innerHTML = '';
  gameContainer.appendChild(canvas);
}

// Start the game
function startGame() {
  gameLoop();
}

startGame();
