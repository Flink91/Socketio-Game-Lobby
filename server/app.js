//Express Server with Nodemon - will refresh the server automatically on change
var uuid = require("node-uuid");
var Room = require("./js/room.js");
var Player = require("./js/player.js");

const express = require("express");

const app = express();

const server = app.listen(3001, function () {
  console.log("server running on port 3001");
});

var rooms = {};
var clients = {};

const io = require("socket.io")(server);

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
    io.emit("NEW_USER", data);
    io.emit("UPDATE_ROOMS", rooms);

    //HOST A ROOM
    socket.on("HOST", function (readableName, size, isPrivate, callback) {
      // create new room ID on host
      var newRoomID = uuid.v4();
      if (connectClientToRoom(newRoomID, socket.id, true, readableName, size, isPrivate)) {
        callback(newRoomID);
      }
    });

    //JOIN A ROOM
    socket.on("JOIN", function (roomID, callback) {
      // join existing room
      if (connectClientToRoom(roomID, socket.id, false)) {
        callback(roomID);
      }
    });

    //
    //Room specific socket actions here
    //

    socket.on("SEND_MESSAGE", function (msg) {
      console.log("message recieved");
      // find out which room the client is in
      var room = findRoomByID(socket.id, rooms);
      console.log("New message in room " + room.readableName + ": " + msg.message);

      io.sockets
        .in(room.id)
        .emit("CHAT_MESSAGE", msg, socket.id, clients[socket.id].color);
    });

    socket.on("create_game", function (hostID) {
      //find room of host
      var room = findRoomByID(hostID, rooms);

      console.log("Host ID: " + hostID);
      console.log("Room ID: " + room.id);
      //send that room the game_started_by_host
      io.sockets.in(room.id).emit("game_started_by_host");
    });

    //
    // Helper Functions here
    //
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

    function connectClientToRoom(roomID, clientID, isHost, readableName, size, isPrivate) {
      // if the client is already a host, or already connected to a room
      if (clients[clientID].isHost || clients[clientID].room) {
        return false;
      }

      socket.join(roomID, function (err) {
        if (!err) {
          clients[socket.id].isHost = isHost;
          clients[socket.id].room = roomID;

          if (isHost) {
            rooms[roomID] = new Room(roomID, clients[clientID], readableName, size, isPrivate);
            console.log(
              clients[clientID].name +
              " has created room: " +
              rooms[roomID].readableName + " with size: " + size + " and private?: " + isPrivate);
          } else {
            rooms[roomID].addClient(clients[clientID]);
            console.log(
              clients[clientID].name +
              " has joined room: " +
              rooms[roomID].readableName
            );
          }

          io.sockets.emit("UPDATE_ROOMS", rooms);
          getPeopleInRoom(clientID, roomID);
        } else {
          // handle error message
          console.log(socket.id + " FAILED to join room: " + roomID);
        }
      });

      return true;
    }

    function getPeopleInRoom(clientID) {
      var room = findRoomByID(clientID, rooms);
      if (room != null) {
        io.sockets.in(room.id).emit("GET_ROOM_INFO", room);
      }
    }
  });
});
