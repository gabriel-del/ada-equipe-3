const canvas = document.querySelector('canvas'), ctx = canvas.getContext('2d')

class Game {
  static running = false
  static start() {
    // const interval = setInterval(() => snake.alive ? snake.move() : clearInterval(interval), snake.speed)
    const interval = setInterval(() => {
      if (Game.snakes.some(snake => snake.alive)){
        Game.snakes.forEach(snake => {if (snake.alive){ snake.move() } })
      } else {
        clearInterval(interval)
      }
      this.running = true
    }, 200)
  }

  static end() {console.log('Morreu!')}
  static #snakes = []
  static get snakes() {return this.#snakes}
  static set snakes(snakes) {this.#snakes = snakes}
}
class Board {
  static #squareSize
  static #width
  static #height
  static #squares

  constructor(squareSize, width, height) {
    Board.width = width
    Board.height = height
    Board.squareSize = squareSize
    canvas.width = width*squareSize
    canvas.height = height*squareSize
    Board.squares = [].concat(...Array.from({length: Board.width}, (_, y) => Array.from({length: Board.height}, (_, x) => ({x, y}))))
    Board.paint(Board.squares, false)
  }

  static paint(squares, boolean) {
    ctx.shadowBlur = 20;
    ctx.shadowColor = "#eee";
    squares.forEach(({x, y}) => {
      if (boolean) {ctx.fillStyle = 'green' ; ctx.strokeStyle = '#0a0'
      ctx.lineWidth = 2;
    } else {
      switch(x % 2 + y % 2){
        case 0: ctx.fillStyle = '#dddddd' ;break
        case 1: ctx.fillStyle = '#eee' ;break
        case 2: ctx.fillStyle = '#e0e0e0' ;break
      }
      ctx.lineWidth = 0;
      ctx.strokeStyle = "#eee"
    }
    ctx.fillRect(x*Board.squareSize, y*Board.squareSize, Board.squareSize, Board.squareSize)
    ctx.strokeRect(x*Board.squareSize, y*Board.squareSize, Board.squareSize, Board.squareSize)
    })
  }

 
  static get squareSize() {return this.#squareSize}
  static set squareSize(squareSize) {this.#squareSize = squareSize}
  static get squares() {return this.#squares}
  static set squares(squares) {this.#squares = squares}
  static get width() {return this.#width}
  static set width(width) {this.#width = width}
  static get height() {return this.#height}
  static set height(height) {this.#height = height}
}
class Snake {
  static directions = [{x: -1, y: 0}, {x: 0, y: -1}, {x: +1, y: 0}, {x: 0, y: +1}]
  constructor(speed, scalesInterval, keys) {
    this.speed = Math.floor(1000 / speed)
    this.scales = scalesInterval
    if (scalesInterval[0].y === scalesInterval[1].y)
      while (this.scales[1].x - 1 !== this.scales[0].x) this.scales.splice(1, 0, {x: this.scales[1].x - 1, y: scalesInterval[0].y})
    else if (scalesInterval[0].x === scalesInterval[1].x)
      while (this.scales[1].y - 1 !== this.scales[0].y) this.scales.splice(1, 0, {x: scalesInterval[0].x, y: this.scales[1].y - 1})
    else throw new Error('X ou Y devem ser iguais')
    Board.paint(this.scales, true)
    document.addEventListener('keydown', event => {
      keys.forEach( (key,i) => { if (event.key === key) this.direction = Snake.directions[i]})})
    Game.snakes.push(this)
    }

  alive = true
  direction = {x: 0, y: -1}
  print() {Board.paint(this.scales, true)}
  move() {
    const head = {x: this.scales.slice(-1)[0].x+this.direction.x, y: this.scales.slice(-1)[0].y+this.direction.y}
    if (this.scales.filter(square => JSON.stringify(square) === JSON.stringify(head)).length !== 0) this.alive = false
    if (Board.width - 1 < head.x || head.x <= 0 -1 || Board.height - 1 < head.y || head.y <= 0 -1) this.alive = false
    if (this.alive) {
      this.scales.push(head)
      Board.paint([head], true)
      Board.paint([this.scales.shift()], false)
    } else {Game.end()}
  }
}

new Board(25, 20, 20)
const snake1 = new Snake(5, [{x: 2, y: 5}, {x: 12, y: 5}], ['ArrowLeft', 'ArrowUp', 'ArrowRight', 'ArrowDown'])
const snake2 = new Snake(5, [{x: 2, y: 8}, {x: 12, y: 8}], ['a', 'w', 'd', 's'])


document.addEventListener('keydown', event => {
  if (event.code && !Game.running) Game.start()
  if (event.key === 'q') snake.alive = false // morreu
})
