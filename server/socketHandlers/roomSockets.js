module.exports = function (io, clients, rooms) {

  require("../classes/room.js");
  require("../classes/game.js");
  var roomHelpers = require('../helpers/roomHelpers.js')(io, clients, rooms);

  io().on('connection', socket => {

    //HOST A ROOM
    socket.on("HOST", function (readableName, size, game, callback) {
      var newroomID = roomHelpers.hostARoom(socket, socket.id, readableName, size, game);
      if (newroomID !== false) {
        socket.emit("HOST");
        io().emit("UPDATE_ROOMS", rooms);
        callback(newroomID);
      }
    });

    //JOIN A ROOM
    socket.on("JOIN", function (roomID, callback) {
      if (!roomHelpers.isClient(socket)) return false;
      // join existing room
      if (roomHelpers.connectClientToRoom(socket, roomID, socket.id)) {
        io().sockets.in(roomID).emit("CHAT_MESSAGE", {
          name: "SERVER",
          message: clients[socket.id].name + " joined",
          type: "server",
          color: "#CCC"
        });
        callback(roomID);
      }
    });

    //TOGGLE READY MODE IN ROOM
    socket.on("SET_READY", function (isReady, callback) {
      if (!roomHelpers.isClient(socket)) return false;
      // join existing room
      var room = roomHelpers.findRoomByID(socket.id, rooms);
      // this only updates the client in the room object but that is enough
      var roomClients = room.clients;
      var index = roomClients.findIndex(function (o) {
        return o.id === socket.id;
      })
      roomClients[index].ready = isReady;
      io().sockets.in(room.id).emit("GET_ROOM_INFO", room);
      callback(roomClients[index].ready);
    });

    //HOST KICKS Client
    socket.on("KICK", function (clientID, callback) {
      var toBeKicked = io().sockets.connected[clientID];
      console.log("trying to kick " + toBeKicked.id);

      if (toBeKicked == undefined) return false;
      if (!roomHelpers.isClient(toBeKicked)) return false;
      if (!roomHelpers.isInRoom(clients, toBeKicked.id)) return false;


      if (clients[socket.id].isHost) {
        var room = roomHelpers.findRoomByID(toBeKicked.id, rooms);

        if (roomHelpers.leaveRoom(toBeKicked, room.id)) {
          io().to(toBeKicked.id).emit("KICKED");
          io().sockets.in(room.id).emit("CHAT_MESSAGE", {
            name: "SERVER",
            message: clients[toBeKicked.id].name + " was kicked",
            type: "server",
            color: "#CCC"
          });
          callback();
        }
      }
    });

    //LEAVE ROOM
    socket.on("LEAVE_ROOM", function (callback) {
      if (!roomHelpers.isClient(socket)) return false;
      var roomID = clients[socket.id].room;
      if (roomHelpers.leaveRoom(socket, roomID)) {
        io().sockets.in(roomID).emit("CHAT_MESSAGE", {
          name: "SERVER",
          type: "server",
          message: clients[socket.id].name + " left",
          color: "#CCC"
        });
        callback();
      }
    });

    //on disconnect remove from room too
    socket.on('disconnect', function () {
      console.log("disconnected from room");
      if (roomHelpers.isInRoom(clients, socket.id)) {
        console.log("is in room true");
        var roomID = clients[socket.id].room;
        io().sockets.in(roomID).emit("CHAT_MESSAGE", {
          name: "SERVER",
          type: "server",
          message: clients[socket.id].name + " left",
          color: "#CCC"
        });
        roomHelpers.leaveRoom(clients[socket.id], roomID);
      }
      io().emit("UPDATE_ROOMS", rooms);
      clients[socket.id] = null;

    });
  });

};
