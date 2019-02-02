module.exports = function (io, clients, rooms) {
  var uuid = require("node-uuid");
  var Room = require("./room.js");
  var Game = require("./game.js");
  io().on('connection', socket => {

    //HOST A ROOM
    socket.on("HOST", function (readableName, size, game, callback) {
      if (clients[socket.id] == undefined) return false;
      // create new room ID on host
      var newRoomID = uuid.v4();
      if (hostARoom(socket, newRoomID, socket.id, readableName, size, game)) {
        callback(newRoomID);
      }
    });

    //JOIN A ROOM
    socket.on("JOIN", function (roomID, callback) {
      if (!isClient(socket)) return false;
      // join existing room
      if (connectClientToRoom(socket, roomID, socket.id)) {
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
      if (!isClient(socket)) return false;
      // join existing room
      var room = findRoomByID(socket.id, rooms);
      // this only updates the client in the room object but that is enough
      var roomClients = room.clients;
      var index = roomClients.findIndex(function (o) {
        return o.id === socket.id;
      })
      roomClients[index].ready = isReady;
      io().sockets.in(room.id).emit("GET_ROOM_INFO", room);
      callback(roomClients[index].ready);
    });

    //TOGGLE READY MODE IN ROOM
    socket.on("START_GAME", function (options) {
      if (!isClient(socket)) return false;

      var room = findRoomByID(socket.id, rooms);

      room.game = new Game(room.id, "Connect Four", Object.values(room.clients));
      console.log(Object.values(room.clients));
      room.game.startGame(options);
      //pick random starting player
      let currentPlayer = room.game.players[room.game.currentPlayer];
      console.log("currentplayer: ");
      console.log(currentPlayer);
      console.log(options);
      io().sockets.in(room.id).emit("START_GAME", options, currentPlayer);
    });

    //TOGGLE READY MODE IN ROOM
    socket.on("GAME_TURN", function (turn) {
      if (!isClient(socket)) return false;
      // join existing room
      var room = findRoomByID(socket.id, rooms);

      if (room.game.players[room.game.currentPlayer].id != socket.id) {
        return false;
      }
      if (room.game.nextTurn(turn)) {
        io().sockets.in(room.id).emit("GAME_TURN", room.game.boardState, room.game.players[room.game.currentPlayer]);
      } else {
        //the game ended
        io().sockets.in(room.id).emit("END_GAME", room.game.boardState, room.game.winner);
        room.game = undefined;
      }
    });

    //SEND A CHAT MESSAGE
    socket.on("SEND_MESSAGE", function (msg) {
      if (!isClient(socket)) return false;
      if (!isInRoom(socket, socket.id)) return false;
      // find out which room the client is in
      msg.color = clients[socket.id].color;
      var room = findRoomByID(socket.id, rooms);
      io().sockets
        .in(room.id)
        .emit("CHAT_MESSAGE", msg);
    });

    //HOST KICKS Client
    socket.on("KICK", function (clientID, callback) {
      var toBeKicked = io().sockets.connected[clientID];

      if (toBeKicked == undefined) return false;
      if (!isClient(toBeKicked)) return false;
      if (!isInRoom(socket, toBeKicked.id)) return false;

      if (clients[socket.id].isHost) {
        var room = findRoomByID(toBeKicked.id, rooms);

        if (leaveRoom(toBeKicked, room.id)) {
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
      if (!isClient(socket)) return false;
      var roomID = clients[socket.id].room;
      if (leaveRoom(socket, roomID)) {
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

      if (isInRoom(socket, socket.id)) {
        var roomID = clients[socket.id].room;
        io().sockets.in(roomID).emit("CHAT_MESSAGE", {
          name: "SERVER",
          type: "server",
          message: clients[socket.id].name + " left",
          color: "#CCC"
        });
        leaveRoom(socket, roomID);
      }
      io().emit("UPDATE_ROOMS", rooms);
      clients[socket.id] = null;

    });
  });


  function hostARoom(socket, roomID, clientID, readableName, size, game) {
    if (isInRoom(socket, clientID)) {
      socket.emit("ERROR", {
        message: "You are already connected to a room",
        type: "error"
      });
      return false;
    }
    if (clients[socket.id] == undefined) return false;

    socket.join(roomID, function (err) {
      if (!err) {
        clients[socket.id].isHost = true;
        clients[socket.id].room = roomID;

        rooms[roomID] = new Room(roomID, clients[clientID], readableName, size, game);
        console.log(clients[clientID].name + " has created room: " +
          rooms[roomID].readableName + " with size: " + size);

        socket.emit("HOST");
        io().sockets.emit("UPDATE_ROOMS", rooms);
        getPeopleInRoom(clientID, roomID);
      } else {
        // handle error message
        console.log(socket.id + " FAILED to join room: " + roomID);
        return false;
      }
    });

    return true;
  }

  function connectClientToRoom(socket, roomID, clientID) {
    if (isInRoom(socket, clientID)) {
      socket.emit("ERROR", {
        message: "You are already connected to a room",
        type: "error"
      });
      return false;
    }
    if (clients[socket.id] == undefined) return false;

    // if room exists and is full
    if (rooms[roomID]) {
      if (rooms[roomID].size <= rooms[roomID].clients.length) {
        socket.emit("ERROR", {
          message: "This room is full",
          type: "error"
        });
        return false;
      }
    }

    socket.join(roomID, function (err) {

      if (!err) {
        clients[socket.id].isHost = false;
        clients[socket.id].room = roomID;

        rooms[roomID].addClient(clients[clientID]);
        console.log(
          clients[clientID].name +
          " has joined room: " +
          rooms[roomID].readableName
        );

        io().sockets.emit("UPDATE_ROOMS", rooms);
        getPeopleInRoom(clientID, roomID);
      } else {
        // handle error message
        console.log(socket.id + " FAILED to join room: " + roomID);
        return false;
      }
    });

    return true;
  }

  /**
   * leave room in socket logic, remove client from room.clients[], check if * room is now empty and update Room List and Room Info
   */
  function leaveRoom(client, roomID) {

    client.leave(roomID, function (err) {
      if (!err && client) {
        var room = rooms[roomID];

        // deletes client from room.clients[Client{},Client{},Client{}] array
        var roomClients = room.clients;
        var index = roomClients.findIndex(function (o) {
          return o.id === client.id;
        })
        if (index !== -1) roomClients.splice(index, 1);

        // if the Client is still there, update Client object
        if (clients[client.id]) {
          clients[client.id].isHost = null;
          clients[client.id].room = null;
        }

        // check if room now empty => delete
        if (room.clients.length <= 0) {
          deleteRoom(roomID);
        }

        // Emit changes
        io().sockets.emit("UPDATE_ROOMS", rooms);
        io().sockets.in(roomID).emit("GET_ROOM_INFO", room);

      } else {
        socket.emit("ERROR", {
          message: err,
          type: "error"
        });
        console.log(err);
        return false;
      }
    });
    return true;
  }

  function deleteRoom(roomID) {
    delete rooms[roomID];
  }

  function isClient(socket) {
    if (clients[socket.id] == undefined) {
      socket.emit("ERROR", {
        message: "User unknown. Maybe you lost connection. Please join again.",
        type: "error"
      });
      return false;
    } else {
      return true;
    }
  }

  function isInRoom(socket, clientID) {
    // if the client is already a host, or already connected to a room
    if (clients[clientID] != undefined) {
      if ("room" in clients[clientID]) {
        if (clients[clientID].room != undefined) {
          return true;
        }
      } else {
        return false;
      }
    }
  }

  function getPeopleInRoom(clientID) {
    var room = findRoomByID(clientID, rooms);
    if (room != null) {
      io().sockets.in(room.id).emit("GET_ROOM_INFO", room);
    }
  }

  /**
   * Find a room by providing the id of a client
   */
  function findRoomByID(clientID, rooms) {
    var key, room;
    for (key in rooms) {
      if (rooms.hasOwnProperty(key)) {
        room = rooms[key];
        //if (room.hostID === hostID) {
        //    return room;
        //}
        for (var i = 0; i < room.clients.length; i++) {
          if (room.clients[i].id === clientID) {
            return room;
          }
        }
      }
    }
    return null;
  }

};
