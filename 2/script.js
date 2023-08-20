const listKey = 'todo-list',
  inputTitle = document.querySelector('#title'),
  inputDesc = document.querySelector('#desc'),
  add = document.querySelector('#add'),
  update = document.querySelector('#update'),
  searchBar = document.querySelector('header input'),
  listOut = JSON.parse(localStorage.getItem(listKey) || '[]'),
  display = ['none', 'inline-block'],
  showBtnAdd = show => {add.style.display = display[+show]; update.style.display = display[+!show]},
  F = f => index => {f(index); updateList()},
  remove = index => listOut.splice(index, 1),
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
    alert('Digite um item para incluir na lista.')
  } else {
    inputTitle.style.border = ''
    listOut.unshift({Task: inputTitle.value, Description: inputDesc.value, done: false})
    inputTitle.value = ''
    inputDesc.value = ''
  }
}))

searchBar.addEventListener('input', () => {
  const searchBarInput = searchBar.value.toLowerCase(),
    list = listOut.filter(({Task, Description}) => Task.toLowerCase().includes(searchBarInput) || Description.toLowerCase().includes(searchBarInput))
  updateList(list)
})

function edit(index) {
  inputTitle.value = listOut[index].Task
  inputDesc.value = listOut[index].Description
  showBtnAdd(false)
  update.addEventListener('click', () => {
    listOut[index].Task = inputTitle.value
    listOut[index].Description = inputDesc.value
    inputTitle.value = ''
    showBtnAdd(true)
    updateList()
  }, {once: true})
}

function updateList(list = listOut) {
  localStorage.setItem(listKey, JSON.stringify(listOut))
  const listIn = document.querySelector('ul')
  listIn.innerHTML = ''
  list.forEach((value, index) => {
    listIn.innerHTML += `
    <li><span class='task ${value.done === true ? 'done' : ''}'>${value.Task}</span>
      <span class='description'>${value.Description}</span>
      <div>
        <button id='edit' onclick='edit(${index})' class="bi bi-pencil"/>
        <button id='remove' onclick='F(remove)(${index})' class="bi bi-trash3"/>
        <button id='done' onclick='F(done)(${index})' class="bi bi-bag-check"/>
    </div></li><hr>`
  })
}

updateList()
