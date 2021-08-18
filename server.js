const express = require('express')
const app = express()
const path = require('path')
const http = require('http')
const server = http.createServer(app)
const { Server } = require('socket.io')
const io = new Server(server)

app.use(express.static(path.join(__dirname, '/public')))

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html')
})

io.on('connection', (socket) => {

  socket.on('new-user', (userName) => {
    socket.emit('new-user', userName)
  })

  socket.on('chat-message', (userName, msg) => {
    socket.broadcast.emit('chat-message', userName, msg)
  })

  socket.on('disconnect', () => {
    console.log('a user disconnected')
  })
})

server.listen(3000, () => console.log('listening on port 3000'))