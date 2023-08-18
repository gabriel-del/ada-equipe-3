const listKey = 'todo-list',
  input = document.querySelector('input'),
  add = document.querySelector('#add'),
  update = document.querySelector('#update'),
  listOut = JSON.parse(localStorage.getItem(listKey) || '[]'),
  display = ['none', 'inline-block']
let updateList

const F = f => index => {f(index); updateList()}
(updateList = () => {
  localStorage.setItem(listKey, JSON.stringify(listOut))
  const listIn = document.querySelector('ul')
  listIn.innerHTML = ''
  listOut.forEach((value, index) => {
    listIn.innerHTML += `
  <li><span class='${value.done === true ? 'done' : ''}'>${value.Task}</span><div>
  <button id='edit' onclick='edit(${index})' class="bi bi-pencil"/>
  <button id='remove' onclick='F(remove)(${index})' class="bi bi-trash3"/>
  <button id='done' onclick='F(done)(${index})' class="bi bi-bag-check"/>
  </div></li><hr>`
  })
})()
input.addEventListener('keypress', e => {
  if (e.key === 'Enter') document.querySelector('section').querySelector('button:not([style*="display: none"])').click()
})
add.addEventListener('click', F(() => {
  if (!input.value) {
    input.style.border = '1px solid red'
    alert('Digite um item para incluir na lista.')
  } else {
    input.style.border = ''
    listOut.unshift({Task: input.value, done: false})
    input.value = ''
  }
}))

const
  showBtnAdd = show => {
    add.style.display = display[+show]; update.style.display = display[+!show]
  },
  remove = index => listOut.splice(index, 1),
  done = index => listOut[index].done = !listOut[index].done,
  edit = index => {
    input.value = listOut[index].Task
    showBtnAdd(false)
    update.addEventListener('click', () => {
      listOut[index].Task = input.value
      input.value = ''
      showBtnAdd(true)
      updateList()
    }, {once: true})
  }
