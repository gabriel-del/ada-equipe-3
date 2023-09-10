import Board from "./Board.js"
import Game from "./Game.js"
const status = document.querySelector('#status > div')



export default class Snake {
  static directions = [{x: -1, y: 0}, {x: 0, y: -1}, {x: +1, y: 0}, {x: 0, y: +1}]
  static lengthStart

  constructor(scalesInterval, keys) {
    this.scales = scalesInterval  
    if (scalesInterval[0].y === scalesInterval[1].y){
      this.initialLength = scalesInterval[1].x - scalesInterval[0].x +1
      while (this.scales[1].x - 1 !== this.scales[0].x) this.scales.splice(1, 0, {x: this.scales[1].x - 1, y: scalesInterval[0].y})
    } else if (scalesInterval[0].x === scalesInterval[1].x){
      this.initialLength = scalesInterval[1].y - scalesInterval[0].y +1
      while (this.scales[1].y - 1 !== this.scales[0].y) this.scales.splice(1, 0, {x: scalesInterval[0].x, y: this.scales[1].y - 1})
    } else throw new Error('X ou Y devem ser iguais')
  Game.snakes.push(this)  
    Board.paint(this.scales, 'Snake', Game.snakes.indexOf(this))
    document.addEventListener('keydown', event => {
      keys.forEach( (key,i) => { 
        if (event.key === key && i % 2 != Snake.directions.indexOf(this.direction) % 2) this.direction = Snake.directions[i]
      })})
    }
  alive = true
  direction = {x: +1, y: 0}
  points() {return this.scales.length-this.initialLength}
  index() {return Game.snakes.indexOf(this)}

  move() {
    const head = {x: this.scales.slice(-1)[0].x+this.direction.x, y: this.scales.slice(-1)[0].y+this.direction.y}
    if (Game.snakes.reduce( (acc,snake) => acc.concat(snake.scales), [])
    .some(({x,y}) => x == head.x && y == head.y)){
      if (Game.selfDestruct){
        this.alive = false
      } else {
        Board.paint([this.scales.shift()], 'Board')
        if( this.scales.length == 0)  this.alive = false
        Game.printPoints()
      }
    } 
    if (Game.borders){
      if (Board.width - 1 < head.x || head.x <= -1 || Board.height - 1 < head.y || head.y <= -1) this.alive = false
    } else {
      head.x = (head.x + Board.width) % Board.width
      head.y = (head.y + Board.height) % Board.height
    }
    if (this.alive) {
      this.scales.push(head)
      Board.paint([head], 'Snake', Game.snakes.indexOf(this))
      if (JSON.stringify(head) == JSON.stringify(Game.apple)) {
        Game.setApple()
        Game.printPoints()
        if (this.scales.length - this.initialLength >= Game.goalPoints) Game.end()
      } else {
        const tail = this.scales.shift()
        if (!Game.snakes.reduce( (acc,snake) => acc.concat(snake.scales), [])
        .some(({x,y}) => x == tail.x && y == tail.y))  Board.paint([tail], 'Board')
      }
      
    } else {status.innerHTML += `<p>Snake <b>${this.index()}</b> died!<p>`}   

  }

}