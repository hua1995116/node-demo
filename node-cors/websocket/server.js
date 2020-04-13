const WebSocket = require("ws");
const server = new WebSocket.Server({ port: 8080 });
server.on("connection", function (socket) {
  socket.on("message", function (data) {
    socket.send(data);
  });
});
