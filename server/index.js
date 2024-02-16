const express = require('express')
const app = express()
const PORT = 5000

const http = require('http').Server(app)
const cors = require('cors')
const socketIO = require('socket.io')(http, {
    cors: {
        origin: 'http://localhost:5173'
    }
})

app.get('api', (request, response) => {
    response.json({
        message: 'hello'
    })
})

const users = []

const deleteUserById = (socketID) => {
    for (let i = 0; i < users.length; i++) {
        if (users[i].socketID === socketID) {
            users.splice(i, 1);
            break; // Выходим из цикла после удаления объекта
        }
    }
}

socketIO.on('connection', (socket) => {
    console.log(`${socket.id} user connected`)
    socket.on('message', (data) => {
        socketIO.emit('response', data)
    })

    socket.on('newUser', (data) => {
        users.push(data)
        socketIO.emit('responseNewUser', users)
    })

    socket.on('typing', (data) => {
        socket.broadcast.emit('responseTyping', data)
    })

    socket.on('leave', (data) => {
        deleteUserById(data.socketID)
        socketIO.emit('responseNewUser', users)
    })

    socket.on('disconnect', () => {
        console.log(`${socket.id} disconnect`)
        users.filter(user => user.socketID !== socket.id)
    })
})

http.listen(PORT, () => {
    console.log('Server working...')
})