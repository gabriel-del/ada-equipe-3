const canvas = document.querySelector('canvas'), ctx = canvas.getContext('2d')
class Board {
  constructor(squareSize, width, height) {
    this.width= width
    this.height = height
    canvas.width = width*squareSize
    canvas.height = height*squareSize
    this.squareSize = squareSize
    ctx.fillStyle = 'white'
    ctx.strokeStyle = 'darkblue'
    ctx.fillRect(0, 0, width*squareSize, height*squareSize)
    ctx.strokeRect(0, 0, width*squareSize, height*squareSize)}
  clear() {
    ctx.fillStyle = 'white'
    ctx.strokeStyle = 'black'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    ctx.strokeRect(0, 0, canvas.width, canvas.height) }
}
class Snake {
  constructor(board, snakeInterval, speed) {
    this.speed = Math.floor(1000 / speed)
    this.snake = snakeInterval
    this.board = board
    this.squareSize = this.board.squareSize
    this.width = this.board.width
    this.height = this.board.height
    if (snakeInterval[0].y === snakeInterval[1].y)
      while (this.snake[1].x - 1 !== this.snake[0].x) this.snake.splice(1, 0, {x: this.snake[1].x - 1, y: snakeInterval[0].y})
    else if (snakeInterval[0].x === snakeInterval[1].x)
      while (this.snake[1].y - 1 !== this.snake[0].y) this.snake.splice(1, 0, {x: snakeInterval[0].x, y: this.snake[1].y - 1})
    else console.log('X ou Y devem ser iguais')  }
  alive = true
  direction = {x: 1, y: 0}
  print() {
    this.snake.forEach(({x, y}) => {
      ctx.fillStyle = 'lightblue'
      ctx.strokeStyle = 'darkblue'
      ctx.fillRect(x*this.squareSize, y*this.squareSize, this.squareSize, this.squareSize)
      ctx.strokeRect(x*this.squareSize, y*this.squareSize, this.squareSize, this.squareSize)
    })}
  move() {
    const head = {x: this.snake.slice(-1)[0].x+snake.direction.x, y: this.snake.slice(-1)[0].y+snake.direction.y}
    if (this.snake.filter(square => JSON.stringify(square) === JSON.stringify(head)).length !== 0) snake.alive = false
    if (this.board.width - 1 < head.x || head.x <= 0 -1 || this.board.height - 1 < head.y || head.y <= 0 -1) snake.alive = false
    snake.print()
    if (snake.alive) {
      this.snake.push(head)
      this.snake.shift()
      board.clear()
      snake.print()
    } else {console.log('Morreu')}}
}
let board = new Board(20, 20, 20),
    snake = new Snake(board, [{x: 2, y: 10}, {x: 10, y: 10}], 5)
const interval = setInterval(() => snake.alive ? snake.move() : clearInterval(interval), snake.speed)

document.addEventListener('keydown', event => {
  if (event.keyCode === 37) snake.direction = {x: -1, y: 0} // L
  if (event.keyCode === 38) snake.direction = {x: 0, y: -1} // U
  if (event.keyCode === 39) snake.direction = {x: +1, y: 0} // R
  if (event.keyCode === 40) snake.direction = {x: 0, y: +1} // D
  if (event.keyCode === 81) snake.alive = false // morreu
})
