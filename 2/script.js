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
  const newTask = {Task: input.value, done: false}
  input.style.border = ''
  if (!input.value) {
    input.style.border = '1px solid red'
    return alert('Digite um item para incluir na lista.')
  }
  if (values.length === 0) {
    values.push({Id: values.length + 1, ...newTask})
    saveList()
    input.value = ''
    return showTodoList()
  }
  lastTask = values.findLast(({Id}) => Id >= values.length)
  lastId = lastTask.Id
  values.push({Id: lastId + 1, ...newTask})
  saveList()
  input.value = ''
  showTodoList()
}

add.addEventListener('click', addNewTask)

function saveList() { localStorage.setItem(localStorageKey, JSON.stringify(values)) }

function showTodoList() {
  const list = document.querySelector('ul')
  list.innerHTML = ''
  for (const value of values) {
    list.innerHTML += `
        <li>
          <span class='${value.done === true ? 'task-done' : ''}'>${value.Task}</span>
            <div id='btn-task'>
              <button id='edit' onclick='editTask("${value.Id}")' class="bi bi-pencil"></button>
              <button id='remove' onclick='removeItem("${value.Id}")' class="bi bi-trash3" ></button>
              <button id='done' onclick='doneTask("${value.Id}")' class="bi bi-bag-check"></button>
            </div>
        </li>
      <hr>`
  }
}

function editTask(data) {
  const index = values.findIndex(i => i.Id == data)
  idToUpdate = values[index].Id
  input.value = values[index].Task
  add.style.display = 'none'
  update.style.display = 'block'
}

function removeItem(data) {
  const index = values.findIndex(i => i.Id == data)
  values.splice(index, 1)
  saveList()
  showTodoList()
}

function doneTask(data) {
  const index = values.findIndex(i => i.Id == data)
  values[index].done = !values[index].done
  saveList()
  showTodoList()
}

function updateTask() {
  const index = values.findIndex(i => i.Id === idToUpdate)
  values[index].Task = input.value
  saveList()
  input.value = ''
  showTodoList()
}
update.addEventListener('click', updateTask)
showTodoList()
