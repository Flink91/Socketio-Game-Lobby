//Express Server with Nodemon - will refresh the server automatically on change

const express = require('express');

const app = express();

const server = app.listen(3001, function() {
    console.log('server running on port 3001');
});


const io = require('socket.io')(server);

io.on('connection', function(socket) {
    console.log(socket.id)
    socket.on('SEND_NEW_USER', function(data) {
        console.log(socket.id + "is now known as: " + data.username +" (" + data.color + ")");
        io.emit('ON_NEW_USER', data)
    });
});