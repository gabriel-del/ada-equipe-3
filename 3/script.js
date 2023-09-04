const canvas = document.querySelector('canvas'), ctx = canvas.getContext('2d')
  
function has_game_ended() {
  for (let i = 4; i < snake.length; i++)
  if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) return true
  return snake[0].x < 0 || snake[0].y < 0 || snake[0].x > canvas.width - 10 || snake[0].y > canvas.height - 10
}

class Board {
  constructor(width, height, squareSize){
    ctx.fillStyle = 'white';
    ctx.strokeStyle = 'darkblue';
    ctx.fillRect(0, 0, width, height);
    ctx.strokeRect(0, 0, width, height);
  }
clear(){
  ctx.fillStyle = 'white'
  ctx.strokeStyle = 'black'
  ctx.fillRect(0, 0, canvas.width, canvas.height)
  ctx.strokeRect(0, 0, canvas.width, canvas.height)

}
}
  
document.addEventListener('keydown', event => {
  if (event.keyCode === 37 ) snake.move("L")
  if (event.keyCode === 38 ) snake.move("U")
  if (event.keyCode === 39 ) snake.move("R")
  if (event.keyCode === 40 ) snake.move("D")
  })
  
  class Snake {
    constructor(snake){this.snake = snake}
    print(){
      this.snake.forEach(({x, y}) => {
        ctx.fillStyle = 'lightblue'
        ctx.strokeStyle = 'darkblue'
        ctx.fillRect(x, y, 10, 10)
        ctx.strokeRect(x, y, 10, 10)
      })}
      move(direction){
        switch (direction) {
          case 'L': this.snake.push({x: this.snake.slice(-1)[0].x-10, y: this.snake.slice(-1)[0].y+0}) ;break;
          case 'R': this.snake.push({x: this.snake.slice(-1)[0].x+10, y: this.snake.slice(-1)[0].y+0}) ;break;
          case 'U': this.snake.push({x: this.snake.slice(-1)[0].x+0, y: this.snake.slice(-1)[0].y-10}) ;break;
          case 'D': this.snake.push({x: this.snake.slice(-1)[0].x+0, y: this.snake.slice(-1)[0].y+10}) ;break;
        }
        this.snake.shift()
        board.clear()
        snake.print()
        
      }
    }
    
    let board = new Board(400, 400, 1);
    let snake = new Snake([{x: 160, y: 200}, {x: 170, y: 200}, {x: 180, y: 200}, {x: 190, y: 200}, {x: 200, y: 200}])
    snake.print()
   
