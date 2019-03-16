function Room(id, client, hostId, readableName, size, game) {
  this.id = id;
  this.readableName = readableName;
  this.hostID = hostId;
  this.clients = [];
  this.size = size;
  this.game = game;
  this.addClient(client);
}

Room.prototype.addClient = function (client) {
  this.clients.push(client);
  console.log(
    "Clients in room with id: " +
    this.id +
    "\n First Client:" +
    this.clients[0].name
  );
};

module.exports = Room;
