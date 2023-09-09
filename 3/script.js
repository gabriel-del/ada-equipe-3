import Game from "./Game.js"
import Board from "./Board.js"
import Snake from "./Snake.js"

// (speed, Die on borders, selfDestruct, goalPoints)
new Game([8, 1, 1], false, false, 8)
// (Size of one square, width, height)
new Board(30, 20, 20)
// ([snake Beginning, snake End], [Left, Up, Right, Down])
const snake1 = new Snake([{x: 2, y: 0}, {x: 5, y: 0}], ['ArrowLeft', 'ArrowUp', 'ArrowRight', 'ArrowDown'])
// const snake2 = new Snake([{x: 2, y: 4}, {x: 5, y: 4}], ['a', 'w', 'd', 's'])
// const snake3 = new Snake([{x: 2, y: 8}, {x: 10, y: 8}], ['a', 'w', 'd', 's'])
//  const snake4 = new Snake([{x: 2, y: 12}, {x: 10, y: 12}], ['a', 'w', 'd', 's'])


document.addEventListener('keydown', event => {
  if (event.code && Game.running && Game.paused) Game.start()
  if (event.key === 'q') Game.stop()
})


