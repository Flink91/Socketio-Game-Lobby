var Room = function(id, client, readableName) {
  this.id = id;
  this.readableName = readableName;
  this.hostID = client.id;
  this.clients = [];
  this.addClient(client);
};

Room.prototype.addClient = function(client) {
  this.clients.push(client);
  console.log(
    "Clients in room with id: " +
      this.id +
      "\n First Client:" +
      this.clients[0].id
  );
};

module.exports = Room;
