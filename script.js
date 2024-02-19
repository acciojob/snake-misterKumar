// Constants for direction codes
const LEFT_DIR = 37;
const UP_DIR = 38;
const RIGHT_DIR = 39;
const DOWN_DIR = 40;

// Variables to track game state
let currentSnakeHeadPosition;
let snakeBodyPixels;
let snakeCurrentDirection;
let moveSnakeInterval;
let totalFoodAte;

// Function to initialize the game
const initializeGame = () => {
    // Initialize game state variables
    currentSnakeHeadPosition = GAME_PIXEL_COUNT * 19 + 0; // Start at 20th row, 1st column
    snakeBodyPixels = [];
    snakeCurrentDirection = RIGHT_DIR;
    totalFoodAte = 0;

    // Reset the score in the UI
    document.getElementById("pointsEarned").innerHTML = totalFoodAte;

    // Create initial snake
    createSnake();

    // Create initial food
    createFood();

    // Start moving the snake automatically
    moveSnakeInterval = setInterval(moveSnake, 100);
};

// Function to create the snake on the game board
const createSnake = () => {
    // Clear any existing snake body pixels
    for (let pixel of snakeBodyPixels) {
        pixel.classList.remove("snakeBodyPixel");
    }
    snakeBodyPixels = [];

    // Add snake head
    let snakeHeadPixel = gameBoardPixels[currentSnakeHeadPosition];
    snakeHeadPixel.classList.add("snakeBodyPixel");
    snakeBodyPixels.push(snakeHeadPixel);
};

// Function to handle keyboard input for changing snake direction
const changeDirection = (newDirectionCode) => {
    // Change the direction of the snake if it's a valid direction and not opposite to current direction
    if ((newDirectionCode === LEFT_DIR || newDirectionCode === RIGHT_DIR) && snakeCurrentDirection !== LEFT_DIR && snakeCurrentDirection !== RIGHT_DIR) {
        snakeCurrentDirection = newDirectionCode;
    } else if ((newDirectionCode === UP_DIR || newDirectionCode === DOWN_DIR) && snakeCurrentDirection !== UP_DIR && snakeCurrentDirection !== DOWN_DIR) {
        snakeCurrentDirection = newDirectionCode;
    }
};

// Function to create food on the game board
const createFood = () => {
    // Generate random position for food
    let foodPosition;
    do {
        foodPosition = Math.floor(Math.random() * SQUARE_OF_GAME_PIXEL_COUNT);
    } while (snakeBodyPixels.some(pixel => pixel.dataset.position === foodPosition.toString()));

    // Display food on the game board
    let foodPixel = gameBoardPixels[foodPosition];
    foodPixel.classList.add("food");
};

// Function to move the snake on the game board
const moveSnake = () => {
    // Calculate next position based on current direction
    let nextPosition;
    switch (snakeCurrentDirection) {
        case LEFT_DIR:
            nextPosition = currentSnakeHeadPosition - 1;
            break;
        case UP_DIR:
            nextPosition = currentSnakeHeadPosition - GAME_PIXEL_COUNT;
            break;
        case RIGHT_DIR:
            nextPosition = currentSnakeHeadPosition + 1;
            break;
        case DOWN_DIR:
            nextPosition = currentSnakeHeadPosition + GAME_PIXEL_COUNT;
            break;
        default:
            return;
    }

    // Check for collision with walls or snake body
    if (nextPosition < 0 || nextPosition >= SQUARE_OF_GAME_PIXEL_COUNT || (snakeBodyPixels.some(pixel => pixel.dataset.position === nextPosition.toString()))) {
        // Game over, stop moving the snake
        clearInterval(moveSnakeInterval);
        alert("Game Over! Your Score: " + totalFoodAte);
        initializeGame(); // Restart the game
        return;
    }

    // Move snake to next position
    let nextPixel = gameBoardPixels[nextPosition];
    nextPixel.classList.add("snakeBodyPixel");
    snakeBodyPixels.push(nextPixel);
    currentSnakeHeadPosition = nextPosition;

    // Check for food eaten
    if (nextPixel.classList.contains("food")) {
        // Remove food and increment score
        nextPixel.classList.remove("food");
        totalFoodAte++;
        document.getElementById("pointsEarned").innerHTML = totalFoodAte;
        createFood(); // Create new food
    } else {
        // Remove tail of the snake if not eating food
        let tailPixel = snakeBodyPixels.shift();
        tailPixel.classList.remove("snakeBodyPixel");
    }
};

// Initialize game when the page is loaded
window.onload = initializeGame;

// Event listeners for keyboard input
document.addEventListener("keydown", (event) => {
    const keyCode = event.keyCode;
    if (keyCode === LEFT_DIR || keyCode === UP_DIR || keyCode === RIGHT_DIR || keyCode === DOWN_DIR) {
        changeDirection(keyCode);
    }
});

// Mobile-friendly controls
const leftButton = document.getElementById("leftButton");
const rightButton = document.getElementById("rightButton");
const upButton = document.getElementById("upButton");
const downButton = document.getElementById("downButton");

leftButton.onclick = () => changeDirection(LEFT_DIR);
rightButton.onclick = () => changeDirection(RIGHT_DIR);
upButton.onclick = () => changeDirection(UP_DIR);
downButton.onclick = () => changeDirection(DOWN_DIR);
