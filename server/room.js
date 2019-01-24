function Room(id, client, readableName, size, isPrivate) {
  this.id = id;
  this.readableName = readableName;
  this.hostID = client.id;
  this.clients = [];
  this.size = size;
  this.isPrivate = isPrivate;
  this.addClient(client);
}

Room.prototype.addClient = function (client) {
  this.clients.push(client);
  console.log(
    "Clients in room with id: " +
    this.id +
    "\n First Client:" +
    this.clients[0].id
  );
};

module.exports = Room;
