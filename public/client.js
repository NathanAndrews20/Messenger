const socket = io()

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