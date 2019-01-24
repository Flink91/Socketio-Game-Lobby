const express = require("express");

// needed for frontend serving
const serveStatic = require("serve-static");
const path = require("path");

//needed for backend socket server
var uuid = require("node-uuid");
var Room = require("./server/room.js");
var Player = require("./server/player.js");

const app = express();

app.use("/", serveStatic(path.join(__dirname, "/dist/")));

const PORT = process.env.PORT || 8080;
const socketIO = require("socket.io");
const server = express()
  .use(app)
  .listen(PORT, () => console.log(`Listening Socket on ${ PORT }`));

// reroute any filesearch to index (for heroku)
// app.get(/.*/, function (req, res) {
//   res.sendfile(__dirname + "/dist/index.html");
// });



var rooms = {};
var clients = {};

const io = socketIO(server);
var getIOInstance = function () {
  return io;
};

// Some complicated moduling to keep this file smaller. SocketIO is passed via Instance
require('./server/roomModule.js')(getIOInstance, clients, rooms);
require('./server/gameModule.js')(getIOInstance);

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
