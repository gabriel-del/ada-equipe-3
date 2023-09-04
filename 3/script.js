const canvas = document.querySelector('canvas'), ctx = canvas.getContext('2d')
class Board {
  constructor(width, height, squareSize) {
    ctx.fillStyle = 'white'
    ctx.strokeStyle = 'darkblue'
    ctx.fillRect(0, 0, width, height)
    ctx.strokeRect(0, 0, width, height)
  }

  clear() {
    ctx.fillStyle = 'white'
    ctx.strokeStyle = 'black'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    ctx.strokeRect(0, 0, canvas.width, canvas.height)
  }
}

document.addEventListener('keydown', event => {
  if (event.keyCode === 37) snake.direction = {x: -10, y: 0} // L
  if (event.keyCode === 38) snake.direction = {x: 0, y: -10} // U
  if (event.keyCode === 39) snake.direction = {x: +10, y: 0} // R
  if (event.keyCode === 40) snake.direction = {x: 0, y: +10} // D
  if (event.keyCode === 81) snake.alive = false // morreu
})

class Snake {
  constructor(snake) {this.snake = snake}
  print() {
    this.snake.forEach(({x, y}) => {
      ctx.fillStyle = 'lightblue'
      ctx.strokeStyle = 'darkblue'
      ctx.fillRect(x, y, 10, 10)
      ctx.strokeRect(x, y, 10, 10)
    })
  }

  direction = {x: 10, y: 0}
  alive = true
  move() {
    let head = {x: this.snake.slice(-1)[0].x+snake.direction.x, y: this.snake.slice(-1)[0].y+snake.direction.y}
    if (this.snake.filter(square => JSON.stringify(square) == JSON.stringify(head)).length != 0) snake.alive = false
    if (400 - 10 < head.x || head.x <= 0 -10 || 400 - 10 < head.y || head.y <= 0 -10) snake.alive = false
    if (snake.alive) {
    this.snake.push(head)
    this.snake.shift()
    board.clear()
    snake.print()
    } 
  }
} 

let board = new Board(400, 400, 1),
    snake = new Snake([{x: 160, y: 200}, {x: 170, y: 200}, {x: 180, y: 200}, {x: 190, y: 200}, {x: 200, y: 200}, {x: 210, y: 200}, {x: 220, y: 200}, {x: 230, y: 200}, {x: 240, y: 200}]),
    interval = setInterval(() => snake.alive ? snake.move() : clearInterval(interval), 1000)
