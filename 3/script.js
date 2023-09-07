import Game from "./Game.js"
import Board from "./Board.js"
import Snake from "./Snake.js"

new Game(5)
new Board(20, 25, 25)
const snake = new Snake([{x: 2, y: 5}, {x: 12, y: 5}], ['ArrowLeft', 'ArrowUp', 'ArrowRight', 'ArrowDown'])
// const snake2 = new Snake([{x: 2, y: 8}, {x: 12, y: 8}], ['a', 'w', 'd', 's'])


document.addEventListener('keydown', event => {
  if (event.code && !Game.running) Game.start()
  if (event.key === 'q') Game.stop()
})
