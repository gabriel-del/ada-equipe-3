const canvas = document.querySelector('canvas'), ctx = canvas.getContext('2d')

class Game {
  static running = false
  static start() {
    const interval = setInterval(() => snake.alive ? snake.move() : clearInterval(interval), snake.speed)
    this.running = true
  }
  static end() { console.log("Morreu!")}
}
class Board {
  static #squareSize = 123
  #width
  #height
  static #texto = "9898"

  constructor(squareSize, width, height, texto) {
    this.#width= width
    Board.texto = texto
    this.#height = height
    canvas.width = width*squareSize
    canvas.height = height*squareSize
    this.squareSize = squareSize
    ctx.fillStyle = 'white'
    ctx.strokeStyle = 'darkblue'
    ctx.fillRect(0, 0, width*squareSize, height*squareSize)
    ctx.strokeRect(0, 0, width*squareSize, height*squareSize)
  }

  // #texto = 2323

static set texto (texto) {this.#texto = texto }
static get texto() { return this.#texto }
  static clear() {
    ctx.fillStyle = 'white'
    ctx.strokeStyle = 'black'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    ctx.strokeRect(0, 0, canvas.width, canvas.height)
  }
  static get squareSize() {return this.#squareSize}
  static set squareSize(squareSize) {this.#squareSize = squareSize}
  get width() {return this.#width}
  set width(width) {this.#width = width}
  get height() {return this.#height}
  set height(height) {this.#height = height}
}
class Snake {
  #squareSize
  #width
  #height

  constructor(snakeInterval, speed) {
    this.speed = Math.floor(1000 / speed)
    this.scales = snakeInterval
    if (snakeInterval[0].y === snakeInterval[1].y)
      while (this.scales[1].x - 1 !== this.scales[0].x) this.scales.splice(1, 0, {x: this.scales[1].x - 1, y: snakeInterval[0].y})
    else if (snakeInterval[0].x === snakeInterval[1].x)
      while (this.scales[1].y - 1 !== this.scales[0].y) this.scales.splice(1, 0, {x: snakeInterval[0].x, y: this.scales[1].y - 1})
    else throw new Error('X ou Y devem ser iguais')
  }

  alive = true
  direction = null
  print() {
    this.scales.forEach(({x, y}) => {
      ctx.fillStyle = 'lightblue'
      ctx.strokeStyle = 'darkblue'
      ctx.fillRect(x*this.squareSize, y*this.squareSize, this.squareSize, this.squareSize)
      ctx.strokeRect(x*this.squareSize, y*this.squareSize, this.squareSize, this.squareSize)
    })
  }

  move() {
    const head = {x: this.scales.slice(-1)[0].x+this.direction.x, y: this.scales.slice(-1)[0].y+this.direction.y}
    if (this.scales.filter(square => JSON.stringify(square) === JSON.stringify(head)).length !== 0) this.alive = false
    if (this.width - 1 < head.x || head.x <= 0 -1 || this.height - 1 < head.y || head.y <= 0 -1) this.alive = false
    if (this.alive) {
      this.scales.push(head)
      this.scales.shift()
      Board.clear()
      this.print()
    } else {Game.end()}
  }

  get squareSize() {return this.#squareSize}
  set squareSize(squareSize) {this.#squareSize = squareSize}
  get width() {return this.#width}
  set width(width) {this.#width = width}
  get height() {return this.#height}
  set height(height) {this.#height = height}
}

const boardGame = new Board(20, 20, 20, "lalalala")
const snake = new Snake([{x: 2, y: 10}, {x: 10, y: 10}], 5)
snake.squareSize = boardGame.squareSize
snake.width = boardGame.width
snake.height = boardGame.height
// Board.texto = 43437878
// Board.squareSize = 43437878
console.log(Board.texto)
console.log(Board.squareSize)

document.addEventListener('keydown', event => {
  if (event.code === 'ArrowLeft') snake.direction = {x: -1, y: 0}
  if (event.code === 'ArrowUp') snake.direction = {x: 0, y: -1}
  if (event.code === 'ArrowRight') snake.direction = {x: +1, y: 0}
  if (event.code === 'ArrowDown') snake.direction = {x: 0, y: +1}
  if (event.code && !Game.running) Game.start()
  if (event.key === 'q') snake.alive = false // morreu
})
