module.exports = function (io, clients, rooms) {
  var uuid = require("node-uuid");
  var Room = require("../classes/room.js");

  function hostARoom(socket, clientID, readableName, size, game) {
    if (isInRoom(clients, clientID)) {
      sendError(socket, "You are already in a room");
      return false;
    } else if (clients[socket.id] == undefined) {
      sendError(socket, "You are not known on the server");
      return false;
    }

    var roomID = uuid.v4();
    rooms[roomID] = new Room(roomID, clients[clientID], readableName, size, game);

    socket.join(roomID, function (err) {
      if (!err) {
        clients[socket.id].isHost = true;
        clients[socket.id].room = roomID;
        console.log(clients[clientID].name + " has created room: " +
          rooms[roomID].readableName + " with size: " + size);
        getPeopleInRoom(clientID, roomID);
        return roomID;
      } else {
        console.log(socket.id + " FAILED to join room: " + roomID);
        sendError(socket, err);
        return roomID;
      }
    });
    return roomID;
  }

  function connectClientToRoom(socket, roomID, clientID) {
    if (isInRoom(clients, clientID)) {
      sendError(socket, "You are already in a room");
      return false;
    } else if (clients[socket.id] == undefined) {
      sendError(socket, "You are not known on the server");
      return false;
    } else if (!rooms[roomID]) {
      sendError(socket, "This room does not exist anymore");
      return false;
    } else if (rooms[roomID].size <= rooms[roomID].clients.length) {
      sendError(socket, "This room is full");
      return false;
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
        return true;
      } else {
        sendError(socket, err);
        return false;
      }
    });
    return true;
  }

  /**
   * leave room in socket logic, remove client from room.clients[], check if room is now empty and update Room List and Room Info
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


        //if the host leaves, all others are kicked and the room is deleted
        if (clients[client.id].isHost) {
          console.log(clients[client.id].isHost);
          io().sockets.in(roomID).emit("HOST_LEFT");
        }

        // if the Client is still online, update Client object
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
        sendError(socket, err);
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

  function isInRoom(clients, clientID) {
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

  function getPeopleInRoom(clientID, roomID) {
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

  function sendError(socket, err) {
    socket.emit("ERROR", {
      message: err,
      type: "error"
    });
  }

  return {
    hostARoom: hostARoom,
    connectClientToRoom: connectClientToRoom,
    leaveRoom: leaveRoom,
    deleteRoom: deleteRoom,
    isClient: isClient,
    isInRoom: isInRoom,
    getPeopleInRoom: getPeopleInRoom,
    findRoomByID: findRoomByID
  }
}
