module.exports = function (io, clients, rooms) {

  var Room = require("../room.js");

  function hostARoom(sockets, socket, rooms, roomID, clients, clientID, readableName, size, game) {
    if (isInRoom(clients, clientID)) {
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
        sockets.emit("UPDATE_ROOMS", rooms);
        getPeopleInRoom(sockets, clientID, roomID);
      } else {
        // handle error message
        console.log(socket.id + " FAILED to join room: " + roomID);
        return false;
      }
    });

    return true;
  }

  function connectClientToRoom(socket, roomID, clientID) {
    if (isInRoom(clients, clientID)) {
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
        getPeopleInRoom(sockets, clientID, roomID);
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

  function getPeopleInRoom(sockets, clientID) {
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
