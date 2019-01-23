//Express Server with Nodemon - will refresh the server automatically on change
var uuid = require("node-uuid");
var Room = require("./js/room.js");
var Player = require("./js/player.js");

const PORT = process.env.PORT || 3000;
const express = require("express");

const app = express();

const server = app.listen(PORT, function () {
  console.log("server running on port " + PORT);
});

var rooms = {};
var clients = {};

const io = require("socket.io")(server);
var getIOInstance = function () {
  return io;
};

// Some complicated moduling to keep this file smaller. SocketIO is passed via Instance
require('./js/roomModule.js')(getIOInstance, clients, rooms);
require('./js/gameModule.js')(getIOInstance);

io.on("connection", function (socket) {
  console.log("New connection: " + socket.id);


  socket.on("NEW_USER", function (data) {
    console.log(
      socket.id + "is now known as: " + data.username + " (" + data.color + ")"
    );
    clients[socket.id] = new Player(
      socket.id,
      data.username,
      data.color,
      null,
      null
    );
    io.emit("NEW_USER", clients[socket.id]);

    socket.emit("JOINED_SERVER", data);
    socket.emit("UPDATE_ROOMS", rooms);
  });

  socket.on('disconnect', function () {
    console.log("Disconnected: " + socket.id);
    // TODO if in room
    io.emit('USER_DISCONNECTED', clients[socket.id]);
    clients[socket.id] = null;

  });

});
