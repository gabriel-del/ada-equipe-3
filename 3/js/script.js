import Game from './Game.js'
import Board from './Board.js'
import Snake from './Snake.js'

// (speed, Die on borders, selfDestruct, goalPoints)
// new Game([6, 1, 1], true, true, 999)
// (Size of one square, width, height)
new Board(40, 20, 20)
// ([snake Beginning, snake End], [Left, Up, Right, Down])
new Snake([{x: 1, y: 10}, {x: 5, y: 10}], ['ArrowLeft', 'ArrowUp', 'ArrowRight', 'ArrowDown'])
// new Snake([{x: 1, y:15}, {x: 5, y: 15}], ['a', 'w', 'd', 's'])
// new Snake([{x: 2, y: 8}, {x: 10, y: 8}], ['a', 'w', 'd', 's'])
//new Snake([{x: 2, y: 12}, {x: 10, y: 12}], ['a', 'w', 'd', 's'])

// document.addEventListener('keydown', event => {
//   if (event.code && Game.running && Game.paused) Game.start()
//   if (event.key === 'q') Game.stop()
// })
let buttonStart = document.getElementById("startGame");




let form = document.getElementById("form")


form.addEventListener("submit", function(event){

  event.preventDefault()
  let speed = document.getElementById("speed");
  const widthTab = document.getElementById("widthTab");
  const heightTab = document.getElementById("heightTab");
  const goalPoints = document.getElementById("maxPoints");
  const option = document.getElementsByName("gameMode");
  
  let optionGame = "";

for (let opcao of option) {
  if (opcao.checked) {
    optionGame = opcao.value;
    break;
  }
}

  new Game([speed.value, 1, 1], false, true, 999)
  // if(speed & widthTab & heightTab & goalPoints & optionGame){
    // new Game([speed.value, 1, 1], true, true, goalPoints.value)
  //   new Board(40,widthTab.value , heightTab.value)
  //   new Snake([{x: 1, y: 10}, {x: 5, y: 10}], ['ArrowLeft', 'ArrowUp', 'ArrowRight', 'ArrowDown'])
  // }
  
  if(Game.running && Game.paused) Game.start()
  // if (event.key === 'q') Game.stop()
})




// buttonStart.addEventListener("click", event => {
  
//   if(Game.running && Game.paused) Game.start()
//   // if (event.key === 'q') Game.stop()
// })

document.addEventListener('keydown', event => {
    // if(Game.running && Game.paused) Game.start()
    if (event.key === 'q') Game.stop()
    // if (event.code && Game.running && Game.paused) Game.start()
  })
