module.exports = function (io, clients, rooms) {
  var uuid = require("node-uuid");
  var Room = require("./room.js");
  io().on('connection', socket => {
    console.log("Room module connected");
    //HOST A ROOM
    socket.on("HOST", function (readableName, size, isPrivate, callback) {
      if (clients[socket.id] == undefined) return false;
      // create new room ID on host
      var newRoomID = uuid.v4();
      if (hostARoom(socket, newRoomID, socket.id, readableName, size, isPrivate)) {
        callback(newRoomID);
      }
    });
    //JOIN A ROOM
    socket.on("JOIN", function (roomID, callback) {
      if (checkClientExists(socket)) return false;
      // join existing room
      if (connectClientToRoom(socket, roomID, socket.id)) {
        callback(roomID);
      }
    });
    //SEND A CHAT MESSAGE
    socket.on("SEND_MESSAGE", function (msg) {
      if (checkClientExists(socket)) return false;
      // find out which room the client is in
      msg.color = clients[socket.id].color;
      var room = findRoomByID(socket.id, rooms);

      io().sockets
        .in(room.id)
        .emit("CHAT_MESSAGE", msg);
    });
    //LEAVE ROOM
    socket.on("LEAVE_ROOM", function () {
      if (checkClientExists(socket)) return false;
      var room = clients[socket.id].room;
      leaveRoom(socket, room);
    });

    //on disconnect remove from room too
    socket.on('disconnect', function () {
      console.log("Disconnected from roomModule: " + socket.id);
      // TODO if in room
      if (isInRoom(socket, socket.id)) {
        var room = clients[socket.id].room;

        leaveRoom(socket, room);
        if (clients[socket.id].isHost) {
          deleteRoom(room.id);
        } else {

        }
      }
      io().emit("UPDATE_ROOMS", rooms);
      clients[socket.id] = null;

    });
  });

  function hostARoom(socket, roomID, clientID, readableName, size, isPrivate) {
    if (isInRoom(socket, clientID)) return false;
    if (clients[socket.id] == undefined) return false;

    socket.join(roomID, function (err) {
      if (!err) {
        clients[socket.id].isHost = true;
        clients[socket.id].room = roomID;

        rooms[roomID] = new Room(roomID, clients[clientID], readableName, size, isPrivate);
        console.log(clients[clientID].name + " has created room: " +
          rooms[roomID].readableName + " with size: " + size + " and private?: " + isPrivate);

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
    if (isInRoom(socket, clientID)) return false;
    if (clients[socket.id] == undefined) return false;

    // if room exists and is full
    if (rooms[roomID]) {
      if (rooms[roomID].size <= rooms[roomID].clients.length) {
        socket.emit("ERROR", {
          message: "This room is full"
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
  function leaveRoom(socket, roomID) {
    socket.leave(roomID, function (err) {
      if (!err) {
        var room = rooms[roomID];

        // deletes client from room.clients[Player{},Player{},Player{}] array
        var roomClients = room.clients;
        var index = roomClients.findIndex(function (o) {
          return o.id === socket.id;
        })
        if (index !== -1) roomClients.splice(index, 1);

        // if the player is still there, update player object
        if (clients[socket.id]) {
          clients[socket.id].isHost = null;
          clients[socket.id].room = null;
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
          message: err
        });
        console.log(err);
      }
    });
  }

  function deleteRoom(roomID) {
    delete rooms[roomID];
  }

  function checkClientExists(socket) {
    if (clients[socket.id] == undefined) {
      socket.emit("ERROR", {
        message: "User unknown. Maybe you lost connection. Please join again."
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
          socket.emit("ERROR", {
            message: "You are already connected to a room"
          });
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
