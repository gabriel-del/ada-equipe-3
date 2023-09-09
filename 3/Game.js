import Board from "./Board.js"
const table = document.querySelector('aside table')
const status = document.querySelector('aside > #status > div')
export default class Game {
  static #snakes = []
  static #apple = {x: 5, y: 0}
  static #running = true
  static #paused = true
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
    this.paused = false
    let main = async () => {
      while (this.snakes.some(snake => snake.alive) && this.running && !this.paused) {
        this.snakes.forEach(snake => {if (snake.alive) snake.move() })
        let speed = Game.speed[0]+Math.floor(Game.snakes.reduce((acc,snake) => acc+snake.scales.length - snake.initialLength, 0)/Game.speed[1])*Game.speed[2]
        await new Promise(_ => setTimeout(_, Math.floor(1000 / (speed > 0 ? speed : 1))))    
      }   
    }
    main();
  }
  static printWinner() {
    let maxPoints=this.snakes.reduce((acc,snake) => snake.points() > acc ? snake.points() : acc,0)
    let winners = this.snakes.filter(snake => snake.points() >= maxPoints).map(snake => snake.index())
    status.innerHTML = '<h4>Winner:</h4>'
    winners.forEach(winner => status.innerHTML += `<p>Snake ${winner} with ${maxPoints} points.</p>`)
  }
  static stop() {this.paused = true}
  static end() {
    this.running=false
    this.printWinner()
  Game.snakes.forEach(snake => {
    localStorage.setItem(`Points Snake ${Game.snakes.indexOf(snake)}`,snake.scales.length-snake.lengthStart)
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
      table.innerHTML += `<tr><td>${Game.snakes.indexOf(snake)}</td><td>${snake.scales.length-snake.initialLength}</td></tr>`
  })}
  static get snakes() {return this.#snakes}
  static set snakes(snakes) {this.#snakes = snakes}
  static get apple() {return this.#apple}
  static set apple(apple) {this.#apple = apple}
  static get running() { return this.#running}
  static set running(running){this.#running = running}
  static get paused() { return this.#paused}
  static set paused(paused){this.#paused = paused}
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