import Board from "./Board.js"
const table = document.querySelector('aside table')
export default class Game {
  static #snakes = []
  static #apple = {x: 5, y: 0}
  static #running = false
  static #interval
  static #speed
  static #borders
  static #selfDestruct

  constructor(speed, borders, selfDestruct){
    Game.speed = Math.floor(1000 / speed)
    Game.borders = borders
    Game.selfDestruct = selfDestruct
}
  static start() {
    this.running = true
    this.#interval = setInterval(() => {
      if (this.snakes.some(snake => snake.alive)){
        this.snakes.forEach(snake => {if (snake.alive) snake.move() })
      } else {this.stop() ; this.end()}
    }, this.speed)
  }

  static stop() {clearInterval(this.#interval) ;this.running = false}
  static end() {console.log('Fim de Jogo!')}
  static setApple(){
    do {Game.apple = { x: Math.floor(Math.random() * Board.width), y:  Math.floor(Math.random() * Board.height) }
    } while (Game.snakes.reduce( (acc,snake) => acc.concat(snake.scales), []).some(({x,y}) => x == Game.apple.x && y == Game.apple.y))
    Board.paint([Game.apple], 'Apple')
  }
  static printPoints() { 
    table.innerHTML = `<tr><th>Snake</th><th>Points</th></tr>`
    Game.snakes.forEach(snake => {
      table.innerHTML += `<tr><td>${Game.snakes.indexOf(snake)}</td><td>${snake.scales.length}</td></tr>`
  })}
  static get snakes() {return this.#snakes}
  static set snakes(snakes) {this.#snakes = snakes}
  static get apple() {return this.#apple}
  static set apple(apple) {this.#apple = apple}
  static get running() { return this.#running}
  static set running(running){this.#running = running}
  static get interval() { return this.#interval}
  static set interval(interval){this.#interval = interval}
  static get speed() {return this.#speed}
  static set speed(speed) {this.#speed = speed}
  static get borders() {return this.#borders}
  static set borders(borders) {this.#borders = borders}
  static get selfDestruct() {return this.#selfDestruct}
  static set selfDestruct(selfDestruct) {this.#selfDestruct = selfDestruct}
}