const canvas = document.querySelector('canvas'), ctx = canvas.getContext('2d')

export default class Board {
  static #squareSize
  static #width
  static #height
  static #squares

  constructor(squareSize, width, height) {
    canvas.width = width*squareSize
    canvas.height = height*squareSize
    Board.width = width
    Board.height = height
    Board.squareSize = squareSize
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
    ctx.fillRect(x*this.squareSize, y*this.squareSize, this.squareSize, this.squareSize)
    ctx.strokeRect(x*this.squareSize, y*this.squareSize, this.squareSize, this.squareSize)
    })
  }

 
  static get squareSize() {return this.#squareSize}
  static set squareSize(squareSize) {this.#squareSize = squareSize}
  static get width() {return this.#width}
  static set width(width) {this.#width = width}
  static get height() {return this.#height}
  static set height(height) {this.#height = height}
  static get squares() {return this.#squares}
  static set squares(squares) {this.#squares = squares}
}