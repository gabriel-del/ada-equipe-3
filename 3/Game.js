export default class Game {
  static running = false
  static #speed 
  static #interval
  constructor(speed){Game.speed = Math.floor(1000 / speed)}
  static start() {
    // const interval = setInterval(() => snake.alive ? snake.move() : clearInterval(interval), snake.speed)
    this.#interval = setInterval(() => {
      if (Game.snakes.some(snake => snake.alive)){
        Game.snakes.forEach(snake => {if (snake.alive){ snake.move() } })
      } else {
        clearInterval(this.#interval)
      }
      this.running = true
    }, Game.speed)
  }

  get interval() { return this.#interval}
  set interval(interval){this.#interval = interval}
  static stop() {clearInterval(this.#interval)}
  static end() {console.log('Morreu!')}
  static #snakes = []
  static get snakes() {return this.#snakes}
  static set snakes(snakes) {this.#snakes = snakes}
  static get speed() {return this.#speed}
  static set speed(speed) {this.#speed = speed}
}