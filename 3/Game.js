export default class Game {
  static #snakes = []
  static #running = false
  static #interval
  static #speed
  static #apple = {x: 1, y: 1}

  constructor(speed){Game.speed = Math.floor(1000 / speed) }
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

  static get snakes() {return this.#snakes}
  static set snakes(snakes) {this.#snakes = snakes}
  static get running() { return this.#running}
  static set running(running){this.#running = running}
  static get interval() { return this.#interval}
  static set interval(interval){this.#interval = interval}
  static get speed() {return this.#speed}
  static set speed(speed) {this.#speed = speed}
}