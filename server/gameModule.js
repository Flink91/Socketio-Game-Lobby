module.exports = function (io) {
  io().on('connection', socket => {

    //HOST A ROOM
    socket.on("START_GAME", function (data, callback) {
      // create new room ID on host
      console.log(data);
    });
  });
};
