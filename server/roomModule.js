module.exports = function (io, clients, rooms) {
  var uuid = require("node-uuid");
  var Room = require("./room.js");
  io().on('connection', socket => {
    console.log("Room module connected");
    //HOST A ROOM
    socket.on("HOST", function (readableName, size, isPrivate, callback) {
      // create new room ID on host
      var newRoomID = uuid.v4();
      if (hostARoom(socket, newRoomID, socket.id, readableName, size, isPrivate)) {
        callback(newRoomID);
      }
    });
    //JOIN A ROOM
    socket.on("JOIN", function (roomID, callback) {
      console.log("is it here?" + roomID);
      // join existing room
      if (connectClientToRoom(socket, roomID, socket.id)) {
        callback(roomID);
      }
    });
    //SEND A CHAT MESSAGE
    socket.on("SEND_MESSAGE", function (msg) {
      // find out which room the client is in
      msg.color = clients[socket.id].color;
      var room = findRoomByID(socket.id, rooms);

      io().sockets
        .in(room.id)
        .emit("CHAT_MESSAGE", msg);
    });
  });

  function hostARoom(socket, roomID, clientID, readableName, size, isPrivate) {
    if (isAlreadyInRoom(socket, clientID)) return false;

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
    if (isAlreadyInRoom(socket, clientID)) return false;

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

  function isAlreadyInRoom(socket, clientID) {
    // if the client is already a host, or already connected to a room
    if (clients[clientID].room != undefined) {
      socket.emit("ERROR", {
        message: "You are already connected to a room"
      });
      return true;
    } else {
      return false;
    }
  }

  function getPeopleInRoom(clientID) {
    var room = findRoomByID(clientID, rooms);
    if (room != null) {
      io().sockets.in(room.id).emit("GET_ROOM_INFO", room);
    }
  }

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
