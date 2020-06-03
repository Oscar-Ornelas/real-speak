const express = require("express");
const mongo = require('mongodb').MongoClient;
const http = require("http");
const cors = require("cors");
const socketIo = require("socket.io");

const port = process.env.PORT || 4001;
const url = 'mongodb://localhost:27017';
const index = require("./routes/index");

const app = express();
app.use(cors({ origin: 'http://localhost:3000' }));

app.use(index);
app.use(express.json());

const server = http.createServer(app);

mongo.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }, (err, client) => {
  if (err) {
    console.error(err)
    return;
  }

  const db = client.db('rooms');

  const collection = db.collection('rooms');

  app.post("/api", (req, res) => {
    console.log(req.body);
    collection.insertOne({roomId: JSON.parse(req.body.roomId), users: []}, (err, result) => {

    });
  });

  /*collection.insertOne({roomId: 11111111, users: []}, (err, result) => {

  });*/

  collection.find().toArray((err, items) => {
    console.log(items)
  });

})

const io = socketIo(server);

io.on("connect", onConnect);

function onConnect(socket) {
  socket.emit("connected", "Hello!");
  socket.on("joined_room", (roomId, fn) => {
    socket.join(roomId);
  });

  socket.on("sent_message", messageInfo => {
    socket.to(messageInfo.roomId).emit('message', messageInfo);
  });
}

server.listen(port, () => console.log(`Listening on port ${port}`));
