//a player class in the server
var Player = function (id, name, color, room, isHost) {
  this.id = id;
  this.name = name;
  this.color = color;
  this.room = room;
  this.isHost = isHost;
};

module.exports = Player;
