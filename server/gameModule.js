module.exports = function (io) {
  io().on('connection', socket => {

    //START GAME
    socket.on("START_GAME", function (options, callback) {
      // create new room ID on host
      console.log(options);
    });

    // START TURN OF A PLAYER

    // GET TURN CHOICE

    //

  });
};
