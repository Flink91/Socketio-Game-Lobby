module.exports = function () {

  function findClientBySocketId(id, clients) {
    for (var client in clients) {
      if (clients[client] != null || client[client != undefined]) {
        if (clients[client].id === id) {
          console.log("++correct one found");
          console.log(client);
          return client;
        }
      }
    }
    console.log("--correct one NOT found");
    return false;
  }

  return {
    findClientBySocketId: findClientBySocketId
  }
}
