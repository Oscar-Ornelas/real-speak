const express = require("express");
const app = express();
const request = require("request");
const path = require('path')
const http = require("http");
const server = http.createServer(app);
const cors = require("cors");
const dotenv = require('dotenv');
dotenv.config();
const mongo = require('mongodb').MongoClient;

const port = process.env.PORT || 4001;
const url = `mongodb+srv://OscarO:${process.env.MONGODB_PASSWORD}@real-speak.f9p00.mongodb.net/rooms?retryWrites=true&w=majority`;

app.use(express.static(path.join(__dirname, 'build')));
app.use(express.json());

const allowedOrigins = ['http://localhost:4001',
                      'http://localhost:3000',
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
    client_secret: `${process.env.CLIENT_SECRET}`,
    audience: 'https://dev-pdp1v9a4.auth0.com/api/v2/'
  }
};

request(options, function (error, response, body) {
  if (error) throw new Error(error);

  access_token = JSON.parse(body).access_token;
});

app.get("/api/getAccessToken", (req, res) => {
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
        res.json({isNewUser: false, rooms: item.rooms, userId: item.userId});
      }
    });
  });

  app.post("/api/findRoom", (req, res) => {
    collection.findOne({roomId: JSON.parse(req.body.roomId)}, (err, item) => {
      res.json({roomId: item.roomId, roomDescription: item.roomDescription, roomName: item.roomName, users: item.users, messages: item.roomMessages})
    });
  });

  app.post("/api/addUserToRoom", (req, res) => {
    collection.findOneAndUpdate({userId: req.body.userId}, {$addToSet: {rooms: req.body.roomId}}, (err, item) => {
      if(item.value === null) {
        res.json({successfulAdd: false})
      } else {
        collection.findOneAndUpdate({roomId: JSON.parse(req.body.roomId)}, {$addToSet: {users: {id: req.body.userId, username: item.value.username}}}, (err, item) => {
          res.json({successfulAdd: true})
        });
      }
    });
  });

  app.post("/api/removeUserFromRoom", (req, res) => {
    collection.findOneAndUpdate({userId: req.body.userId}, {$pull: {rooms: JSON.parse(req.body.roomId)}}, (err, item) => {
      res.json({message: "successful"})
    });

    collection.findOneAndUpdate({roomId: JSON.parse(req.body.roomId)}, {$pull: {users: {id: req.body.userId}}}, (err, item) => {
    });
  });

  app.post("/api/createUser", (req, res) => {
    collection.insertOne({
      roomId: JSON.parse(req.body.roomId),
      roomName: req.body.roomName,
      roomDescription: req.body.roomDescription,
      roomMessages: [],
      users: [{id: req.body.userId, username: req.body.username}]}, (err, result) => {
        res.json({roomName: req.body.roomName, roomId: req.body.roomId});
    });

    collection.insertOne({
      userId: req.body.userId,
      username: req.body.username,
      rooms: [req.body.roomId]
    });
  });

  app.post("/api/addRoom", (req, res) => {
    collection.insertOne({
      roomId: JSON.parse(req.body.roomId),
      roomName: req.body.roomName,
      roomDescription: req.body.roomDescription,
      roomMessages: [],
      users: [{id: req.body.userId, username: req.body.username}]}, (err, result) => {
    });

    collection.findOneAndUpdate({
      userId: req.body.userId},
      {$push: {rooms: req.body.roomId}}, (err, item) => {
        res.json({roomName: req.body.roomName, roomId: req.body.roomId});
    });
  });

  app.post("/api/addMessage", (req, res) => {
    collection.findOneAndUpdate({
      roomId: JSON.parse(req.body.roomId)},
      {$push: {roomMessages: req.body.message}}, (err, item) => {
    });
  });

})

const io = require("socket.io").listen(server);
io.set('origins', '*:*');

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

if(process.env.NODE_ENV === "production") {
  app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
  });
}

server.listen(port, () => console.log(`Listening on port ${port}`));
