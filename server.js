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

  app.post("/api/findUser", (req, res) => {
    collection.findOne({user: req.body.userId}, (err, item) => {
      if(!item) {
        res.json({isNewUser: true});
      } else {
        res.json({isNewUser: false, rooms: item.rooms});
      }
    });
  });

  app.post("/api/findRoom", (req, res) => {
    collection.findOne({roomId: JSON.parse(req.body.roomId)}, (err, item) => {
      console.log(item)
      res.json({roomId: item.roomId, roomName: item.roomName, users: item.users})
    });
  });

  app.post("/api/createUser", (req, res) => {
    collection.insertOne({
      roomId: JSON.parse(req.body.roomId),
      roomName: req.body.roomName,
      users: [{id: req.body.userId, username: req.body.username}]}, (err, result) => {
    });

    collection.insertOne({
      user: req.body.userId,
      rooms: [req.body.roomId]
    });
  });

  app.post("/api/updateUser", (req, res) => {
    collection.insertOne({
      roomId: JSON.parse(req.body.roomId),
      roomName: req.body.roomName,
      users: [{id: req.body.userId, username: req.body.username}]}, (err, result) => {
    });

    collection.findOneAndUpdate({
      user: req.body.userId},
      {$push: {rooms: req.body.roomId}}, (err, item) => {
        console.log(item);
    });
  });

  /*collection.find().toArray((err, items) => {
    console.log(items)
  });*/

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
