const express = require("express");
const http = require("http");
const socketIo = require("socket.io");

const port = process.env.PORT || 4001;
const index = require("./routes/index");

const app = express();
app.use(index);

const server = http.createServer(app);

const io = socketIo(server);

io.on("connect", onConnect);

function onConnect(socket) {
  let roomName = "";
  socket.emit("connected", "Hello!");
  socket.on("joined_room", (roomId, fn) => {
    roomName = roomId;
    socket.join(roomName);
  });

  socket.on("sent_message", messageInfo => {
    socket.to(messageInfo.roomId).emit('message', messageInfo);
  });
}

server.listen(port, () => console.log(`Listening on port ${port}`));
