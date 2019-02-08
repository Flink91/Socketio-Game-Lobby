module.exports = function (io, clients, rooms) {

  var roomHelpers = require('../helpers/roomHelpers.js')(io, clients, rooms);
  var Game = require("../classes/game.js");
  io().on('connection', socket => {

    //TOGGLE READY MODE IN ROOM
    socket.on("START_GAME", function (options) {
      if (!roomHelpers.isClient(socket)) return false;

      var room = roomHelpers.findRoomByID(socket.id, rooms);

      //game is started => switch all player to not ready in the lobby
      console.log(room.clients);
      room.clients.forEach(function (client) {
        client.ready = false;
      });
      console.log(room.clients);
      io().sockets.in(room.id).emit("GET_ROOM_INFO", room);

      room.game = new Game(room.id, "Connect Four", Object.values(room.clients));
      console.log(Object.values(room.clients));

      room.game.startGame(options);
      let currentPlayer = room.game.players[room.game.currentPlayer];
      io().sockets.in(room.id).emit("START_GAME", options, currentPlayer);
    });

    //TOGGLE READY MODE IN ROOM
    socket.on("GAME_TURN", function (turn) {
      if (!roomHelpers.isClient(socket)) return false;
      // join existing room
      var room = roomHelpers.findRoomByID(socket.id, rooms);

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
  });
};
