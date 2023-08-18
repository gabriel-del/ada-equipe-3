const listKey = 'todo-list',
  input = document.querySelector('input'),
  add = document.querySelector('#add'),
  update = document.querySelector('#update'),
  listOut = JSON.parse(localStorage.getItem(listKey) || '[]')

  input.addEventListener('keypress', e => {
  if (e.key === 'Enter')  add.style.display !== 'none' ? add.click() : update.click()
})

add.addEventListener('click', () => {
  if (!input.value) {
    input.style.border = '1px solid red'
    alert('Digite um item para incluir na lista.')
  } else {
    input.style.border = ''
    listOut.push({Task: input.value, done: false})
    input.value = ''
    updateList()
  }
})


updateList = () => {
  localStorage.setItem(listKey, JSON.stringify(listOut)) 
  const listIn = document.querySelector('ul')
  listIn.innerHTML = ''
  listOut.forEach(
    (value, index) => {
      listIn.innerHTML += `
        <li>
          <span class='${value.done === true ? 'done' : ''}'>${value.Task}</span>
            <div id='btn-task'>
              <button id='edit' onclick='edit("${index}")' class="bi bi-pencil"></button>
              <button id='remove' onclick='remove("${index}")' class="bi bi-trash3" ></button>
              <button id='done' onclick='done("${index}")' class="bi bi-bag-check"></button>
            </div>
        </li>
      <hr>`
    }
  )
}

showBtnAdd = show => {
if(show){add.style.display = 'block';  update.style.display = 'none'} 
else {add.style.display = 'none'; update.style.display = 'block'}
}


edit = index => {
  input.value = listOut[index].Task
  showBtnAdd(false)
  update.addEventListener('click', () => {
    listOut[index].Task = input.value
    input.value = ''
    updateList()
    showBtnAdd(true)
  })
}

remove = index => {
  listOut.splice(index, 1)
  updateList()
}

done = index => {
  listOut[index].done = !listOut[index].done
  updateList()
}


updateList()