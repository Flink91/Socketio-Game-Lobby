var express = require('express');
var app = express();
var server = require('http').Server(app);
//This ist the Socket Connection
var io = require('socket.io').listen(server);


var players = {};


app.use(express.static(__dirname + '/public'));
app.use('/client', express.static(__dirname + '/client'));

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function (socket) {

  console.log("A user connected");

  // create a new player and add it to our players object
  players[socket.id] = {
    rotation: 0,
    x: Math.floor(Math.random() * 700) + 50,
    y: Math.floor(Math.random() * 500) + 50,
    playerId: socket.id,
    team: (Math.floor(Math.random() * 2) == 0) ? 'red' : 'blue'
  };
  // send the players object to the new player
  socket.emit('currentPlayers', players);
  // update all other players of the new player
  socket.broadcast.emit('newPlayer', players[socket.id]);

  socket.on('disconnect', function () {

    // remove this player from our players object
    delete players[socket.id];
    // emit a message to all players to remove this player
    io.emit('disconnect', socket.id);

    console.log("A user disconnected");
  })
});

server.listen(8081, function () {
  console.log(`Listening on ${server.address().port}`);
});
