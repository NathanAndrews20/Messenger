const socket = io()

const modalWrapper = document.getElementById('modal-wrapper')
const modalForm = document.getElementById('modal-form')
const modalInput = document.getElementById('modal-input')

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

const form = document.getElementById('form')
const input = document.getElementById('input')

socket.on('chat-message', (msg) => {
  console.log(msg)
})

form.addEventListener('submit', (e) => {
  e.preventDefault()
  if (input.value) {
    socket.emit('chat-message', input.value)
    input.value = ''
  }
})