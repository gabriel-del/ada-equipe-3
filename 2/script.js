const listKey = 'todo-list',
  inputTitle = document.querySelector('#title'),
  inputDesc = document.querySelector('#desc'),
  titleCharCount = document.getElementById('title-char-count'),
  descCharCount = document.getElementById('desc-char-count'),
  add = document.querySelector('#add'),
  update = document.querySelector('#update'),
  searchBar = document.querySelector('header input'),
  listOut = JSON.parse(localStorage.getItem(listKey) || '[]'),
  display = ['none', 'inline-block'],
  showBtnAdd = show => {add.style.display = display[+show]; update.style.display = display[+!show]},
  F = f => index => {f(index); updateList()},
  remove = index => {listOut.splice(index, 1); clearInputs(); showBtnAdd(true)},
  done = index => listOut[index].done = !listOut[index].done

inputTitle.addEventListener('keypress', e => {
  if (e.key === 'Enter') document.querySelector('section').querySelector('button:not([style*="display: none"])').click()
})

inputDesc.addEventListener('keypress', e => {
  if (e.key === 'Enter') document.querySelector('section').querySelector('button:not([style*="display: none"])').click()
})

add.addEventListener('click', F(() => {
  if (!inputTitle.value) {
    inputTitle.style.border = '1px solid red'
    alert('Digite o título da tarefa!')
  } else {
    inputTitle.style.border = ''
    listOut.unshift({Task: inputTitle.value, Description: inputDesc.value, done: false})
    clearInputs()
  }
}))

function clearInputs() {
  inputTitle.value = ''
  inputDesc.value = ''
}

function updateCharCount(inputElement, maxLength, charCountElement) {
  const currentLength = inputElement.value.length,
    remaining = maxLength - currentLength
  charCountElement.innerText = remaining
}

inputTitle.addEventListener('input', () => {
  const maxLength = 20
  updateCharCount(inputTitle, maxLength, titleCharCount)
})

inputDesc.addEventListener('input', () => {
  const maxLength = 72
  updateCharCount(inputDesc, maxLength, descCharCount)
})

searchBar.addEventListener('input', () => {
  const searchBarInput = searchBar.value.toLowerCase(),
    list = listOut.filter(({Task, Description}) => Task.toLowerCase().includes(searchBarInput) || Description.toLowerCase().includes(searchBarInput))
  updateList(list)
})

function edit(index) {
  inputTitle.value = listOut[index].Task
  inputDesc.value = listOut[index].Description
  updateCharCount(inputTitle, 20, titleCharCount)
  updateCharCount(inputDesc, 76, descCharCount)
  showBtnAdd(false)
  update.addEventListener('click', () => {
    listOut[index].Task = inputTitle.value
    listOut[index].Description = inputDesc.value
    clearInputs()
    updateCharCount(inputTitle, 20, titleCharCount)
    updateCharCount(inputDesc, 76, descCharCount)
    showBtnAdd(true)
    updateList()
  }, {once: true})
}

function updateList(list = listOut) {
  localStorage.setItem(listKey, JSON.stringify(listOut))
  const listIn = document.querySelector('ul')
  listIn.innerHTML = ''

  if (list.length === 0) {
    listIn.innerHTML = `
    <p class='no-task'>Adicione uma nova tarefa</p>`
  } else {
    list.forEach((value, index) => {
      listIn.innerHTML += `
      <li>
        <span class='task ${value.done ? 'done' : ''}'>${value.Task}</span>
        <span class='description ${value.done ? 'done' : ''}'>${value.Description}</span>
        <div>
          <button id='edit' onclick='edit(${index})' class="bi bi-pencil"/>
          <button id='remove' onclick='F(remove)(${index})' class="bi bi-trash3"/>
          <button id='done' onclick='F(done)(${index})' class="bi bi-check-circle ${value.done ? 'icon-done' : ''}"/>
        </div>
      </li>
      <hr>`
    })
  }

  updateCharCount(inputTitle, 20, titleCharCount)
  updateCharCount(inputDesc, 76, descCharCount)
}
updateList()
