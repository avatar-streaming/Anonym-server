const http = require("http");
const app = require("../../app");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  socket.on("join streaming", (id) => {
    socket.join(id);

    socket.on("chat", (chat) => {
      socket.broadcast.to(id).emit("other user chat", chat);
    });
  });

  socket.on("leave streaming", (id) => {
    socket.leave(id);
  });
});

module.exports = server;
