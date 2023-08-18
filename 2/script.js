const localStorageKey = 'todo-list',
  input = document.querySelector('input'),
  add = document.querySelector('#add'),
  update = document.querySelector('#update'),
  values = JSON.parse(localStorage.getItem(localStorageKey) || '[]')
let idToUpdate = '', lastTask = '', lastId = ''

input.addEventListener('keypress', (e) => {
  if (e.key === 'Enter')  add.style.display !== 'none' ? add.click() : update.click()
})
function addNewTask() {
  if (!input.value) {
    input.style.border = '1px solid red'
    alert('Digite um item para incluir na lista.')
  } else {
    input.style.border = ''
    values.push({Task: input.value, done: false})
    input.value = ''
    saveList()
    showTodoList()
  }
}

add.addEventListener('click', addNewTask)

function saveList() { localStorage.setItem(localStorageKey, JSON.stringify(values)) }

function showTodoList() {
  const list = document.querySelector('ul')
  list.innerHTML = ''
  values.forEach(
    (value, index) => {
      list.innerHTML += `
        <li>
          <span class='${value.done === true ? 'done' : ''}'>${value.Task}</span>
            <div id='btn-task'>
              <button id='edit' onclick='editTask("${index}")' class="bi bi-pencil"></button>
              <button id='remove' onclick='removeItem("${index}")' class="bi bi-trash3" ></button>
              <button id='done' onclick='doneTask("${index}")' class="bi bi-bag-check"></button>
            </div>
        </li>
      <hr>`
    }
  )
}

function editTask(index) {
  input.value = values[index].Task
  add.style.display = 'none'
  update.style.display = 'block'
  update.addEventListener('click', () => {
    values[index].Task = input.value
    saveList()
    input.value = ''
    showTodoList()
  })
}

function removeItem(index) {
  values.splice(index, 1)
  saveList()
  showTodoList()
}

function doneTask(index) {
  values[index].done = !values[index].done
  saveList()
  showTodoList()
}


showTodoList()
