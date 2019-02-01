module.exports = function (io) {
  io().on('connection', socket => {

    //START GAME
    socket.on("START_GAME", function (options, callback) {
      // create new room ID on host
      console.log(options);

      // Start player turn
    });

    socket.on("GAME_TURN", function (turn, callback) {


    });

  });
};
