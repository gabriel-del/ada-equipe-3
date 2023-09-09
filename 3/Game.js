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
  static #goalPoints

  constructor(speed, borders, selfDestruct, goalPoints){
    Game.speed = speed
    Game.borders = borders
    Game.selfDestruct = selfDestruct
    Game.goalPoints = goalPoints
}
  static start() {
    this.running = true
    this.#interval = setInterval(() => {
      if (this.snakes.some(snake => snake.alive)){
        this.snakes.forEach(snake => {if (snake.alive) snake.move() })
      } else {this.stop() ; this.end()}
    }, Math.floor(1000 / this.speed[0]))
    Game.snakes.forEach(snake => {
      snake.lengthStart = snake.scales.length
      snake.score=0
    });
  }

  static stop() {clearInterval(this.#interval) ;this.running = false}
  static end() {this.stop() ;console.log('Fim de Jogo!')
  Game.snakes.forEach(snake => {
    // localStorage.setItem(`Points Snake ${Game.snakes.indexOf(snake)}`,snake.scales.length-snake.lengthStart)
    localStorage.setItem(`Points Snake ${Game.snakes.indexOf(snake)}`,snake.score)
    console.log(snake)
  });
}
  static setApple(){
    do {Game.apple = { x: Math.floor(Math.random() * Board.width), y:  Math.floor(Math.random() * Board.height)}
      Game.snakes.forEach(snake => {
        snake.score++
      })
    
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
  static get goalPoints() {return this.#goalPoints}
  static set goalPoints(goalPoints) {this.#goalPoints = goalPoints}
}