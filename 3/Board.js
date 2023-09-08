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
    squares.forEach(({x, y}) => {
      ctx.lineWidth = 2;
      ctx.strokeStyle = '#030a14';
      if (boolean) {ctx.fillStyle = '#00FF00'} 
      else {ctx.fillStyle = "#030a14"}
      ctx.fillRect(x*Board.squareSize, y*Board.squareSize, Board.squareSize, Board.squareSize)
      ctx.strokeRect(x*Board.squareSize, y*Board.squareSize, Board.squareSize, Board.squareSize)
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