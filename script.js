//your code here
const gameContainer = document.getElementById('gameContainer');
const scoreElement = document.getElementById('score');

let snake = [{ row: 20, col: 1 }];
let food = { row: 10, col: 10 };
let direction = 'right';
let score = 0;

function createPixel(row, col, className,count) {
    const pixel = document.createElement('div');
    pixel.className = className;
    pixel.id = `pixel${count}`;
    pixel.style.gridRowStart = row;
    pixel.style.gridColumnStart = col;
    gameContainer.appendChild(pixel);
}

function updateGame(count) {
    // Clear the game container
    gameContainer.innerHTML = '';

    // Update and draw the snake
    snake.forEach(segment => {
        createPixel(segment.row, segment.col, 'snakeBodyPixel',count);
    });

    // Draw the food
    createPixel(food.row, food.col, 'food');
}

function moveSnake() {
    const head = { ...snake[0] };

    // Update the head position based on the direction
    if (direction === 'right') head.col++;
    else if (direction === 'left') head.col--;
    else if (direction === 'up') head.row--;
    else if (direction === 'down') head.row++;

    // Check if the snake eats the food
    if (head.row === food.row && head.col === food.col) {
        // Increase the score and generate new food
        score++;
        scoreElement.textContent = score;
        food = {
            row: Math.floor(Math.random() * 40),
            col: Math.floor(Math.random() * 40)
        };
    } else {
        // Remove the last segment of the snake
        snake.pop();
    }

    // Add the new head
    snake.unshift(head);

    // Check for collision with walls
    if (
        head.row < 0 ||
        head.row >= 40 ||
        head.col < 0 ||
        head.col >= 40
    ) {
        alert('Game over!');
        // Reset the game
        snake = [{ row: 20, col: 1 }];
        food = { row: 10, col: 10 };
        score = 0;
        scoreElement.textContent = score;
        direction = 'right';
    }
}

document.addEventListener('keydown', function (event) {
    if (event.key === 'ArrowRight' && direction !== 'left') {
        direction = 'right';
    } else if (event.key === 'ArrowLeft' && direction !== 'right') {
        direction = 'left';
    } else if (event.key === 'ArrowUp' && direction !== 'down') {
        direction = 'up';
    } else if (event.key === 'ArrowDown' && direction !== 'up') {
        direction = 'down';
    }
});

// Game loop
let count=1;
setInterval(() => {
    moveSnake();
    updateGame(count);
	count++;
}, 100);