import Game from "./Game.js"
import Board from "./Board.js"
import Snake from "./Snake.js"

// (speed, Die on borders, selfDestruct)
new Game(6, false, false)



// (Size of one square, width, height)
new Board(30, 30, 30)
// ([snake Beginning, snake End], [Left, Up, Right, Down])
const snake1 = new Snake([{x: 2, y: 5}, {x: 20, y: 5}], ['ArrowLeft', 'ArrowUp', 'ArrowRight', 'ArrowDown'])
// const snake2 = new Snake([{x: 2, y: 8}, {x: 5, y: 8}], ['a', 'w', 'd', 's'])


document.addEventListener('keydown', event => {
  if (event.code && !Game.running) Game.start()
  if (event.key === 'q') Game.stop()
})
