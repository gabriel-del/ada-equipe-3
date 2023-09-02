const canvas = document.querySelector('canvas'),
  ctx = canvas.getContext('2d')
let snake = [{x: 200, y: 200}, {x: 190, y: 200}, {x: 180, y: 200}, {x: 170, y: 200}, {x: 160, y: 200}],
  changing_direction = false,
  dx = 10, dy = 0
  




function has_game_ended() {
  for (let i = 4; i < snake.length; i++)
  if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) return true
  
  const hitLeftWall = snake[0].x < 0,
  hitRightWall = snake[0].x > canvas.width - 10,
  hitToptWall = snake[0].y < 0,
  hitBottomWall = snake[0].y > canvas.height - 10
  return hitLeftWall || hitRightWall || hitToptWall || hitBottomWall
}

document.addEventListener('keydown', change_direction)
function change_direction(event) {
  const LEFT_KEY = 37, RIGHT_KEY = 39, UP_KEY = 38, DOWN_KEY = 40

  if (changing_direction) return
  changing_direction = true
  const keyPressed = event.keyCode,
    goingUp = dy === -10,
    goingDown = dy === 10,
    goingRight = dx === 10,
    goingLeft = dx === -10
  if (keyPressed === LEFT_KEY && !goingRight) {dx = -10; dy = 0}
  if (keyPressed === UP_KEY && !goingDown) {dx = 0; dy = -10}
  if (keyPressed === RIGHT_KEY && !goingLeft) {dx = 10; dy = 0}
  if (keyPressed === DOWN_KEY && !goingUp) {dx = 0; dy = 10}
}



main()
function main() {
  if (has_game_ended()) return  

  changing_direction = false
  setTimeout(() => {

      ctx.fillStyle = 'white'
    ctx.strokeStyle = 'black'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    ctx.strokeRect(0, 0, canvas.width, canvas.height)
  
      const head = {x: snake[0].x + dx, y: snake[0].y + dy}
      snake.unshift(head)
      snake.pop()
 
        snake.forEach(snakePart => {
          ctx.fillStyle = 'lightblue'
          ctx.strokeStyle = 'darkblue'
          ctx.fillRect(snakePart.x, snakePart.y, 10, 10)
          ctx.strokeRect(snakePart.x, snakePart.y, 10, 10)
        })
 
    main()
  }, 100)
}
