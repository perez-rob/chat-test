const express = require("express");
const socketIO = require("socket.io");
const path = require("path");

const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

const server = app
  .use((req, res) => res.sendFile("/index.html", { root: __dirname }))
  .listen(PORT, () => console.log(`Listening on ${PORT}`));

const io = socketIO(server);

// httpServer.listen(3000);
let users = {};
let userName;

io.on("connection", (socket) => {
  console.log("New connection 1 from " + socket.handshake.address.address);

  socket.on("new-user", (userName) => {
    console.log("New connection 2 from " + socket.handshake.address.PORT);

    users[socket.id] = userName;
    socket.broadcast.emit("user-connected", userName);
  });
  socket.on("send-chat-message", (message) => {
    socket.broadcast.emit("chat-message", {
      message: message,
      userName: users[socket.id],
    });
  });
  socket.on("disconnect", () => {
    socket.broadcast.emit("user-disconnected", users[socket.id]);
    users[socket.id] = userName;
    delete users[socket.id];
  });
});
