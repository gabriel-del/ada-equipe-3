import Board from "./Board.js"
import Game from "./Game.js"

export default class Snake {
  static directions = [{x: -1, y: 0}, {x: 0, y: -1}, {x: +1, y: 0}, {x: 0, y: +1}]
  constructor(scalesInterval, keys) {
    this.scales = scalesInterval
    this.excludeKey = 'ArrowLeft'
    if (scalesInterval[0].y === scalesInterval[1].y)
      while (this.scales[1].x - 1 !== this.scales[0].x) this.scales.splice(1, 0, {x: this.scales[1].x - 1, y: scalesInterval[0].y})
    else if (scalesInterval[0].x === scalesInterval[1].x)
      while (this.scales[1].y - 1 !== this.scales[0].y) this.scales.splice(1, 0, {x: scalesInterval[0].x, y: this.scales[1].y - 1})
    else throw new Error('X ou Y devem ser iguais')
    Board.paint(this.scales, true)
    document.addEventListener('keydown', event => {
      keys.forEach( (key,i) => { 
        if (event.key === key && event.key !== this.excludeKey) this.direction = Snake.directions[i]
      })
      if(event.code !== this.excludeKey) {
        if(event.code === 'ArrowLeft')  this.excludeKey = 'ArrowRight'
        if(event.code === 'ArrowRight') this.excludeKey = 'ArrowLeft'
        if(event.code === 'ArrowUp') this.excludeKey = 'ArrowDown'
        if(event.code === 'ArrowDown') this.excludeKey = 'ArrowUp'
        console.log(this.excludeKey)
      }
    })
    Game.snakes.push(this)
    }
  died() {console.log(`Snake ${Game.snakes.indexOf(this)} died!`) }
  alive = true
  direction = {x: +1, y: 0}
  print() {Board.paint(this.scales, true)}
  move() {
    const head = {x: this.scales.slice(-1)[0].x+this.direction.x, y: this.scales.slice(-1)[0].y+this.direction.y}
    
    if (Game.snakes.reduce( (acc,snake) => acc.concat(snake.scales), [])
    .filter(square => JSON.stringify(square) === JSON.stringify(head)).length !== 0) this.alive = false
    if (Board.width - 1 < head.x || head.x <= 0 -1 || Board.height - 1 < head.y || head.y <= 0 -1) this.alive = false
    if (this.alive) {
      this.scales.push(head)
      Board.paint([head], true)
      Board.paint([this.scales.shift()], false)
    } else {this.died()}
  }
}