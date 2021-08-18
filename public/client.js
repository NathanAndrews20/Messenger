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
      modalInput.value = ''
      modalWrapper.style.display = 'none'
    }
  })
})

socket.on('chat-message', (name, msg) => {
  appendMessage(name, msg)
})


form.addEventListener('submit', (e) => {
  e.preventDefault()
  if (input.value) {
    socket.emit('chat-message', userName, input.value)
    appendMessage(userName, input.value)
    input.value = ''
  }
})

function appendMessage(name, message){
  const messageDomElement = document.createElement('li')
  messageDomElement.textContent = `${name}: ${message}`
  messageList.appendChild(messageDomElement)
}