import Board from './Board.js'

const table = document.querySelector('aside table'),
  status = document.querySelector('#status > div')

export default class Game {
  static #snakes = []
  static #apple
  static #running = true
  static #paused = true
  static #interval
  static #speed
  static #borders
  static #selfDestruct
  static #goalPoints
  static #localStorage = JSON.parse(localStorage.getItem('snakeGame') || '{"config": {}, "highScores": [] }')

  constructor(speed, borders, selfDestruct, goalPoints) {
    Game.speed = speed
    Game.borders = borders
    Game.selfDestruct = selfDestruct
    Game.goalPoints = goalPoints
  }

  static start() {
    this.paused = false
    status.innerHTML='Jogo em andamento'
    const main = async () => {
      this.setApple()
      while (this.snakesAlive() > 0 && this.running && !this.paused) {
        this.snakes.forEach(snake => {if (snake.alive) snake.move()})
        if (this.isMultiplayer()) {if (this.snakesAlive() <= 1) this.end()} else {if (this.snakesAlive() === 0) this.end()}
        const speed = this.speed[0]+Math.floor(this.snakes.reduce((acc, snake) => acc+snake.points(), 0)/this.speed[1])*this.speed[2]
        await new Promise(_ => setTimeout(_, Math.floor(1000 / (speed > 0 ? speed : 1))))
      }
    }
    main()
  }

  static isMultiplayer() {return this.snakes.length > 1}
  static snakesAlive() {return this.snakes.filter(snake => snake.alive).length}
  static freeSpaces() {return Board.squares.length - this.snakes.reduce((acc, snake) => snake.scales.length +acc, 0)}
  static printWinner() {
    if (this.isMultiplayer()) {
      if (this.snakesAlive() === 0) {status.innerHTML = '<h3>Draw!</h3>'} else {
        const snakesAlive = this.snakes.filter(snake => snake.alive),
          maxPoints=snakesAlive.reduce((acc, snake) => snake.points() > acc ? snake.points() : acc, 0),
          winners = snakesAlive.filter(snake => snake.points() >= maxPoints).map(snake => snake.index())
        status.innerHTML = '<h3>Winner:</h3>'
        winners.forEach(winner => status.innerHTML += `<p>Snake ${winner} with <b>${maxPoints}</b> points.</p>`)
      }
    } else {
      status.innerHTML = (Game.freeSpaces() > 0) ? '<h3>You did</h3>' : '<h3>You Won!</h3>'
      status.innerHTML += `<p><b>${this.snakes[0].points()} points!</p>`
      return this.snakes[0].points()
    }
  }

  static stop() {
    this.paused = true
    status.innerHTML='Jogo Pausado'
  }

  static end() {
    this.running=false
    const points = this.printWinner()
    if (points) {
      this.localStorage.highScores.push(points)
      localStorage.setItem('snakeGame', JSON.stringify(this.localStorage))
    }
    Board.borderBlink()
  }

  static snakesInclude(square) {
    return this.snakes.reduce((acc, snake) => acc.concat(snake.scales), [])
      .some(({x, y}) => x === square.x && y === square.y)
  }

  static setApple() {
    do this.apple = {x: Math.floor(Math.random() * Board.width), y: Math.floor(Math.random() * Board.height)}
    while (this.snakesInclude(this.apple))
    Board.paint([this.apple], 'Apple')
  }

  static printPoints() {
    table.innerHTML = '<tr><th>Snake</th><th>Points</th></tr>'
    this.snakes.forEach(snake => {
      table.innerHTML += `<tr><td>${snake.index()}</td><td>${snake.points()}</td></tr>`
    })
  }

  static get snakes() {return this.#snakes}
  static set snakes(snakes) {this.#snakes = snakes}
  static get localStorage() {return this.#localStorage}
  static set localStorage(localStorage) {this.#localStorage = localStorage}
  static get apple() {return this.#apple}
  static set apple(apple) {this.#apple = apple}
  static get running() {return this.#running}
  static set running(running) {this.#running = running}
  static get paused() {return this.#paused}
  static set paused(paused) {this.#paused = paused}
  static get interval() {return this.#interval}
  static set interval(interval) {this.#interval = interval}
  static get speed() {return this.#speed}
  static set speed(speed) {this.#speed = speed}
  static get borders() {return this.#borders}
  static set borders(borders) {this.#borders = borders}
  static get selfDestruct() {return this.#selfDestruct}
  static set selfDestruct(selfDestruct) {this.#selfDestruct = selfDestruct}
  static get goalPoints() {return this.#goalPoints}
  static set goalPoints(goalPoints) {this.#goalPoints = goalPoints}
}
