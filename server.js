const express = require("express");

// needed for frontend serving
const serveStatic = require("serve-static");
const path = require("path");

//needed for backend socket server
const uuidv4 = require('uuid/v4');
var Client = require("./server/classes/client.js");

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

var helpers = require('./server/helpers/helpers.js')();

const io = socketIO(server);
var getIOInstance = function () {
  return io;
};

io.on("connection", function (socket) {
  console.log("New connection: " + socket.id);

  socket.on("RECONNECT_USER", function (id) {
    console.log("Getting reconnection: " + id);
    console.log(socket.id);

    // If the client is still saved on the server, reconnect, else if the server crashed for example, the client will not be there anymore. We could import all of the localstorage in that case, but that's unsafe
    if (clients[id]) {
      console.log("reconnect accepted");
      clients[id].isConnected = true;
      clients[id].id = socket.id;
      console.log(clients[id]);
      io.emit("RECONNECT_USER", clients[id]);
      // socket.emit("RECONNECT", clients[id]);

      //adding the unique id for convenience as its not on the client class, maybe it should be?
      let data = clients[id];
      data.uniqueId = id;

      socket.emit("JOINED_SERVER", clients[id]);
      socket.emit("UPDATE_ROOMS", rooms);
    } else {
      console.log("reconnect declined, user unknown");
      console.log(clients[id]);
      console.log(socket.id);
      // Client not known on the Server
      socket.emit("RECONNECT_DECLINED");
    }

  });

  socket.on("NEW_USER", function (data) {
    let uniqueId = uuidv4();
    data.uniqueId = uniqueId;
    data.id = socket.id;
    console.log(
      socket.id + " is now known as: " + data.username + " (" + data.color + ")"
    );
    clients[uniqueId] = new Client(
      socket.id,
      data.username,
      data.color,
      null,
      null
    );
    io.emit("NEW_USER", clients[uniqueId]);
    data.name = data.username;
    socket.emit("JOINED_SERVER", data);
    socket.emit("UPDATE_ROOMS", rooms);
  });

  socket.on('disconnect', function () {
    console.log("Disconnected?: " + socket.id);
    var uniqueId = helpers.findClientBySocketId(socket.id, clients);
    if (!clients[uniqueId]) {
      console.log("Disconnected immediately. Client wasn't known");
      return false;
    }

    clients[uniqueId].isConnected = false;
    setTimeout(function () {
      if (!clients[uniqueId].isConnected) {
        console.log("Disconnected: " + uniqueId);
        io.emit('USER_DISCONNECTED', clients[uniqueId]);
      } else {
        console.log("10 sec over. Reconnected beforehand!", clients[uniqueId]);
      }
    }, 10000);
    // can't do that here, roommodule needs to check this first
    // clients[socket.id] = null;


  });

});

function findClientBySocketId(id, clients) {
  console.log("find client by socketId");
  for (var client in clients) {
    if (clients[client].id === id) {
      console.log("correct one found");
      console.log(client);
      return client;
    }
  }
  console.log("correct one NOT found");
  return false;
}

// Some complicated moduling to keep this file smaller. SocketIO is passed via Instance
// order important !
require('./server/socketHandlers/roomSockets.js')(getIOInstance, clients, rooms);
require('./server/socketHandlers/chatSockets.js')(getIOInstance, clients, rooms);
require('./server/socketHandlers/gameSockets.js')(getIOInstance, clients, rooms);
