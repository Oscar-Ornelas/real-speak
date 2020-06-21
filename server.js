const express = require("express");
const request = require("request");
const path = require('path')
const mongo = require('mongodb').MongoClient;
const http = require("http");
const cors = require("cors");
const socketIo = require("socket.io");

const port = process.env.PORT || 4001;
const url = `mongodb+srv://OscarO:${process.env.REACT_APP_MONGODB_PASSWORD}@real-speak.f9p00.mongodb.net/rooms?retryWrites=true&w=majority`;

const app = express();

const server = http.createServer(app);

app.use(express.static(path.join(__dirname, 'build')));
app.use(express.json());

const allowedOrigins = ['http://localhost:4001',
                      'https://real-speak.herokuapp.com'];
app.use(cors({
  origin: function(origin, callback){
    if(!origin) return callback(null, true);
    if(allowedOrigins.indexOf(origin) === -1){
      var msg = 'The CORS policy for this site does not ' +
                'allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  }
}));

let access_token = "";

const options = {
  method: 'POST',
  url: 'https://dev-pdp1v9a4.auth0.com/oauth/token',
  headers: {'content-type': 'application/x-www-form-urlencoded'},
  form: {
    grant_type: 'client_credentials',
    client_id: '8Yjxilx9qldnHipHryE81gsbj09qLJb6',
    client_secret: '-KEN7h9qjLhW2tYEMnbzavnOE3lAwzANfxxVeAkorwzh2WQOnE2wi3xqtGCG1a5q',
    audience: 'https://dev-pdp1v9a4.auth0.com/api/v2/'
  }
};

request(options, function (error, response, body) {
  if (error) throw new Error(error);

  access_token = JSON.parse(body).access_token;
});

app.get("/api/getAccessToken", (req, res) => {
  console.log(access_token);
  res.json({access_token})
});

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
    collection.findOne({userId: req.body.userId}, (err, item) => {
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

  app.post("/api/addUserToRoom", (req, res) => {
    collection.findOneAndUpdate({userId: req.body.userId}, {$push: {rooms: req.body.roomId}}, (err, item) => {
      collection.findOneAndUpdate({roomId: JSON.parse(req.body.roomId)}, {$push: {users: {id: req.body.userId, username: item.username}}}, (err, item) => {

      });
    });
  });

  app.post("/api/createUser", (req, res) => {
    collection.insertOne({
      roomId: JSON.parse(req.body.roomId),
      roomName: req.body.roomName,
      users: [{id: req.body.userId, username: req.body.username}]}, (err, result) => {
    });

    collection.insertOne({
      userId: req.body.userId,
      username: req.body.username,
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
      userId: req.body.userId},
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

app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

server.listen(port, () => console.log(`Listening on port ${port}`));
