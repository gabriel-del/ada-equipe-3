class Snake {
    snakeboard = document.getElementById("snakeboard");
    snakeboard_ctx = snakeboard.getContext("2d");
    snake = [
        { x: 200, y: 200 },
        { x: 190, y: 200 },
        { x: 180, y: 200 },
        { x: 170, y: 200 },
        { x: 160, y: 200 }
      ]
    constructor(){}

    drawSnake() {
        this.snake.forEach(snakePart => {
            snakeboard_ctx.fillStyle = 'lightblue';
            snakeboard_ctx.strokeStyle = 'darkblue';
            snakeboard_ctx.fillRect(snakePart.x, snakePart.y, 10, 10);
            snakeboard_ctx.strokeRect(snakePart.x, snakePart.y, 10, 10);
        });
    }
    
    move_snake() {
        // Create the new Snake's head
        const head = { x: snake[0].x + dx, y: snake[0].y + dy };
        // Add the new head to the beginning of snake body
        this.snake.unshift(head);  
        this.snake.pop();
    }
}

class Board {
    
}
 


const board_border = 'black';
const board_background = "white";
const snake_col = 'lightblue';
const snake_border = 'darkblue';

let snake = [
  { x: 200, y: 200 },
  { x: 190, y: 200 },
  { x: 180, y: 200 },
  { x: 170, y: 200 },
  { x: 160, y: 200 }
]

let dx = 10, dy = 0;

const snakeboard = document.getElementById("snakeboard");
const snakeboard_ctx = snakeboard.getContext("2d");

main();

function main() {
    setTimeout(function onTick() {
        clear_board();
        move_snake();
        drawSnake();
        main();
    }, 100)
}

function clear_board() {
    snakeboard_ctx.fillStyle = board_background;
    snakeboard_ctx.strokestyle = board_border;
    snakeboard_ctx.fillRect(0, 0, snakeboard.width, snakeboard.height);
    snakeboard_ctx.strokeRect(0, 0, snakeboard.width, snakeboard.height);
}  

/*Function that prints the parts*/
function drawSnake() {
    snake.forEach(snakePart => {
        snakeboard_ctx.fillStyle = 'lightblue';
        snakeboard_ctx.strokeStyle = 'darkblue';
        snakeboard_ctx.fillRect(snakePart.x, snakePart.y, 10, 10);
        snakeboard_ctx.strokeRect(snakePart.x, snakePart.y, 10, 10);
    });
}

function move_snake() {
    // Create the new Snake's head
    const head = { x: snake[0].x + dx, y: snake[0].y + dy };
    // Add the new head to the beginning of snake body
    snake.unshift(head);
    snake.pop();
}


