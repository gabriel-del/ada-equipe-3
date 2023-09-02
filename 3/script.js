let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
class Snake {
    dx = 10; 
    dy = 0;
    snake = [{ x: 200, y: 200 }, { x: 190, y: 200 }, { x: 180, y: 200 }, { x: 170, y: 200 }, { x: 160, y: 200 } ]
    constructor(){}

    static drawSnake() {
        this.snake.forEach(snakePart => {
            ctx.fillStyle = 'lightblue';
            ctx.strokeStyle = 'darkblue';
            ctx.fillRect(snakePart.x, snakePart.y, 10, 10);
            ctx.strokeRect(snakePart.x, snakePart.y, 10, 10);
        })}
    
    static move_snake() {
        const head = { x: this.snake[0].x + this.dx, y: this.snake[0].y + this.dy };
        this.snake.unshift(head);   
        this.snake.pop();
    }}
class Board {
    constructor(width, height, squareSize){
        ctx.fillStyle = 'white';
        ctx.strokeStyle = 'darkblue';
        ctx.fillRect(0, 0, width, height);
        ctx.strokeRect(0, 0, width, height);
    }}
 
// main();
let board = new Board(400, 400, 1);

// function main() {
//     setTimeout(function onTick() {
//         Board.clear_board();
//         Snake.move_snake();
//         Snake.drawSnake(); 
//         main();
//     }, 100)}





