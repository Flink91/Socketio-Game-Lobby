module.exports = function (io, clients, rooms) {
  const uuidv4 = require('uuid/v4');
  var Room = require("../classes/room.js");

  var helpers = require('./helpers.js')();

  function hostARoom(socket, clientID, readableName, size, game) {
    if (isInRoom(clients, clientID)) {
      sendError(socket, "You are already in a room");
      return false;
    } else if (clients[clientID] == undefined) {
      console.log("hostaroom: client not known");
      console.log(socket.id);
      console.log(clients);
      sendError(socket, "You are not known on the server");
      return false;
    }

    var roomID = uuidv4();
    rooms[roomID] = new Room(roomID, clients[clientID], clientID, readableName, size, game);

    console.log("new room created, now joining");

    socket.join(roomID, function (err) {
      if (!err) {
        clients[clientID].isHost = true;
        clients[clientID].room = roomID;
        console.log(clients[clientID].name + " has created room: " +
          rooms[roomID].readableName + " with size: " + size);
        io().sockets.emit("UPDATE_ROOMS", rooms);
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
    } else if (clients[clientID] == undefined) {
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
        clients[clientID].isHost = false;
        clients[clientID].room = roomID;

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
    //socket disconnected abruptly. No .leave() is needed then
    var room = rooms[roomID];

    // deletes client from room.clients[Client{},Client{},Client{}] array
    var roomClients = room.clients;
    var index = roomClients.findIndex(function (o) {
      return o.id === client.id;
    })
    if (index !== -1) roomClients.splice(index, 1);

    //if the host leaves, all others are kicked and the room is deleted
    console.log(client);
    if (client.isHost) {
      io().sockets.in(roomID).emit("HOST_LEFT");
      io().sockets.emit("UPDATE_ROOMS", rooms);
    }


    // check if room now empty => delete
    if (room.clients.length <= 0) {
      deleteRoom(roomID);
    }

    // Emit changes
    io().sockets.emit("UPDATE_ROOMS", rooms);
    io().sockets.in(roomID).emit("GET_ROOM_INFO", room);

    if (client.connected) {

      client.leave(roomID, function (err) {
        if (!err) {

          // if the Client is still online, update Client object
          if (client) {
            client.isHost = null;
            client.ready = false;
            client.room = null;
          }

        } else {
          sendError(socket, err);
          return false;
        }
      });
    }
    return true;
  }

  function deleteRoom(roomID) {
    delete rooms[roomID];
  }

  function isClient(socket) {
    var uniqueId = helpers.findClientBySocketId(socket.id, clients);
    if (clients[uniqueId] == undefined) {
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
    var uniqueId = helpers.findClientBySocketId(clientID, clients);
    // if the client is already a host, or already connected to a room
    if (clients[uniqueId] != undefined) {
      if ("room" in clients[uniqueId]) {
        if (clients[uniqueId].room != undefined) {
          return true;
        }
      } else {
        return false;
      }
    }
  }

  function getPeopleInRoom(clientID, roomID) {
    // var room = findRoomByID(clientID, rooms);
    if (rooms[roomID] != null || rooms[roomID] != undefined) {
      console.log("~getpeopleinroom ", roomID);
      io().sockets.in(roomID).emit("GET_ROOM_INFO", rooms[roomID]);
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
