module.exports = function (io, clients, rooms) {

  var helpers = require('../helpers/helpers.js')();
  var roomHelpers = require('../helpers/roomHelpers.js')(io, clients, rooms);

  io().on('connection', socket => {

    //SEND A CHAT MESSAGE
    socket.on("SEND_MESSAGE", function (msg) {
      if (!roomHelpers.isClient(socket)) return false;
      if (!roomHelpers.isInRoom(clients, socket.id)) return false;
      // find out which room the client is in
      var uniqueId = helpers.findClientBySocketId(socket.id, clients);
      msg.color = clients[uniqueId].color;
      var room = roomHelpers.findRoomByID(socket.id, rooms);
      io().sockets
        .in(room.id)
        .emit("CHAT_MESSAGE", msg);
    });
  });

};
