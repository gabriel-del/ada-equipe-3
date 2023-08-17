const localStorageKey = 'todo-list',
  addTaskBtn = document.getElementById('btn-add-task'),
  updateTaskBtn = document.getElementById('btn-update-task'),
  values = JSON.parse(localStorage.getItem(localStorageKey) || '[]'),
  input = document.getElementById('input-new-task')
let idToUpdate = '', lastTask = '', lastId = ''

input.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    e.preventDefault()
    addTaskBtn.style.display !== 'none' ? addTaskBtn.click() : updateTaskBtn.click()
  }
})

function addNewTask() {
  const newTask = {Task: input.value, Status: 'Pendente'}
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

function saveList() { localStorage.setItem(localStorageKey, JSON.stringify(values)) }

function showTodoList() {
  const list = document.getElementById('todo-list')
  list.innerHTML = ''
  for (const value of values) {
    list.innerHTML += `
        <li>
          <span class='${value.Status === 'Finalizado' ? 'task-done' : ''}'>${
      value.Task
    }</span>
            <div id='btn-task'>
              <button id='btn-edit' onclick='editTask("${value.Id}")'><i width="16" height="16" class="bi bi-pencil"></i></button>
              <button id='btn-remove' onclick='removeItem("${value.Id}")'><i width="16" height="16" class="bi bi-save"></i></button>
              <button id='btn-done' onclick='doneTask("${value.Id}")'>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-bag-check" viewBox="0 0 16 16">
                  <path fill-rule="evenodd" d="M10.854 8.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 0 1 .708-.708L7.5 10.793l2.646-2.647a.5.5 0 0 1 .708 0z"/>
                  <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5z"/>
                </svg>
              </button>
            </div>
        </li>
      <hr>
    `
  }
}

function editTask(data) {
  const index = values.findIndex(i => i.Id === data)
  idToUpdate = values[index].Id
  input.value = values[index].Task
  addTaskBtn.style.display = 'none'
  updateTaskBtn.style.display = 'block'
}

function removeItem(data) {
  const index = values.findIndex(i => i.Id === data)
  values.splice(index, 1)
  saveList()
  showTodoList()
}

function doneTask(data) {
  const index = values.findIndex(i => i.Id === data)
  values[index].Status === 'Finalizado' ? (values[index].Status = 'Pendente') : (values[index].Status = 'Finalizado')
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

showTodoList()
