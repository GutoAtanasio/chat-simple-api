const express = require('express');
const http = require('http');
const{ Server } = require('socket.io');
const cors = require('cors');

const app = express();

app.use(cors());
const server = http.createServer(app);
const io = new Server(server, {
    cors: {origin: '*'}
});


io.on('connection', (socket) => {
    console.log('Um usuário se conectou', socket.id);

    socket.on('registerUser', (username) => {
        io.emit('userConnect', username)

        socket.emit('systemMessage', 'Bem vindo ao chat,' + username)
    })

    socket.on('sendMessage', ({ username, message }) => {
        io.emit('newMessage', { username, message})
    })
})

server.listen(3000, () => console.log('Servidor esta rodando na porta 3000'))