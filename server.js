const express = require("express");

// needed for frontend serving
const serveStatic = require("serve-static");
const path = require("path");

//needed for backend socket server
var uuid = require("node-uuid");
var Client = require("./server/client.js");

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

io.on("connection", function (socket) {
  console.log("New connection: " + socket.id);


  socket.on("NEW_USER", function (data) {
    console.log(
      socket.id + "is now known as: " + data.username + " (" + data.color + ")"
    );
    clients[socket.id] = new Client(
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
    io.emit('USER_DISCONNECTED', clients[socket.id]);

    // can't do that here, roommodule needs to check this first
    // clients[socket.id] = null;


  });

});

// Some complicated moduling to keep this file smaller. SocketIO is passed via Instance
// order important !
require('./server/socketHandlers/roomSockets.js')(getIOInstance, clients, rooms);
require('./server/socketHandlers/chatSockets.js')(getIOInstance, clients, rooms);
require('./server/socketHandlers/gameSockets.js')(getIOInstance, clients, rooms);
