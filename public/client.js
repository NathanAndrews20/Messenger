const socket = io()

const modalWrapper = document.getElementById('modal-wrapper')
const modalForm = document.getElementById('modal-form')
const modalInput = document.getElementById('modal-input')

const form = document.getElementById('form')
const input = document.getElementById('input')
const messageList = document.getElementById('message-list')

let userName = ''

socket.on('connect', () => {
  modalWrapper.style.display = 'flex'
  modalForm.addEventListener('submit', e => {
    e.preventDefault()
    if (modalInput.value) {
      socket.emit('new-user', modalInput.value)
      userName = modalInput.value
      addAnnouncement(`${userName} has joined the chat`)
      modalInput.value = ''
      modalWrapper.style.display = 'none'
    }
  })
})

socket.on('new-user', (name) => {
  addAnnouncement(`${name} has joined the chat`)
})

socket.on('user-typing', (name) => {
  addAnnouncement(`${name} is typing...`)
})

socket.on('user-done-typing', (userName) => {
  removeTypingMessage(userName)
})

socket.on('chat-message', (name, msg) => {
  addUserMessage(name, msg)
})

input.addEventListener('focus', e => {
  e.preventDefault
  socket.emit('user-typing', userName)
})

input.addEventListener('blur', e => {
  e.preventDefault
  socket.emit('user-done-typing', userName)
})

form.addEventListener('submit', (e) => {
  e.preventDefault()
  if (input.value) {
    socket.emit('user-done-typing', userName)
    socket.emit('chat-message', userName, input.value)
    addUserMessage(userName, input.value)
    input.value = ''
  }
})

function removeTypingMessage(name){
  const nodeList = document.querySelectorAll('#message-list > li')
  for (let i = 0; i<nodeList.length; i++) {
    const nodeTextContent = nodeList[i].textContent
    if (nodeTextContent === `${name} is typing...`) {
      messageList.removeChild(nodeList[i])
      return
    }
  }
}

function addUserMessage(name, message){
  const messageDomElement = document.createElement('li')
  messageDomElement.innerHTML = `<span class="user-name">${name}</span>: ${message}`
  messageList.appendChild(messageDomElement)
}

function addAnnouncement(message){
  const messageDomElement = document.createElement('li')
  messageDomElement.textContent = message
  messageList.appendChild(messageDomElement)
}