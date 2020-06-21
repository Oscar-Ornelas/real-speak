import React, {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import socketIOClient from "socket.io-client";
import useApiCall from '../views/useApiCall';
import {useAuth0} from "../react-auth0-spa";
import NavBar from './NavBar';
import RoomSideBar from './RoomSideBar';
import UserSideBar from './UserSideBar';
import MessageList from './MessageList';
import Input from './Input';

function ChatApp(props) {
  const [fullUserInfo, setFullUserInfo] = useState({});
  const [userRooms, setUserRooms] = useState([]);
  const [roomUsers, setRoomUsers] = useState([]);
  const [userId, setUserId] = useState("");
  const [roomDescription, setRoomDescription] = useState("");
  const [messages, setMessages] = useState([]);
  const [roomNavSlide, setRoomNavSlide] = useState(false);
  const [userNavSlide, setUserNavSlide] = useState(false);
  const {roomId} = useParams();
  const {roomName} = useParams();
  const {user} = useAuth0();
  const socket = socketIOClient("http://localhost:4001");

  useEffect(() => {
    const data = {roomId};
    fetch("/api/findRoom", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {

      setRoomDescription(data.roomDescription);
      setRoomUsers(data.users)
    })
  }, []);

  useEffect(() => {
    const data = {userId: user.name};
    fetch("/api/findUser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
      setUserId(data.userId);
      data.rooms.forEach(room => {
        const data = {roomId: room}
        fetch("/api/findRoom", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(data => setUserRooms(prevUserRooms => [...prevUserRooms, data]));
      })
    })
  }, []);

  useEffect(() => {
    socket.on("connected", response => {
      console.log(response);
    });

    socket.emit("joined_room", roomId);

    socket.on("message", response => {
      setMessages(prevMessages => [...prevMessages, response]);
    })
  }, [roomId]);

  useEffect(() => {
    if(user && props.access_token) {
      console.log(user);
      fetch(`https://dev-pdp1v9a4.auth0.com/api/v2/users/${user.sub}`, {
        headers: {
          Authorization: `Bearer ${props.access_token}`
        }
      })
      .then(response => response.json())
      .then(data => {
        setFullUserInfo(data);
      })
      .catch(err => console.log(err))
    }
  }, [user, props.access_token])

  function addMessage(messageInfo) {
    socket.emit("sent_message", messageInfo);
  }

  function toggleRoomNavSlide() {
    setRoomNavSlide(prevRoomNavSlide => !prevRoomNavSlide);
  }

  function toggleUserNavSlide() {
    setUserNavSlide(prevUserNavSlide => !prevUserNavSlide);
  }

  return (
    <div>
      <div className="chat-box">
        <RoomSideBar
        setRoomNavSlide={setRoomNavSlide}
        roomNavSlide={roomNavSlide}
        username={fullUserInfo.username}
        rooms={userRooms}
        />

        <main className="main">
          <NavBar
          roomId={roomId}
          userId={userId}
          toggleUserNavSlide={toggleUserNavSlide}
          toggleRoomNavSlide={toggleRoomNavSlide}
          roomName={roomName}
          />


          <MessageList messages={messages} roomName={roomName}/>
          <Input
          roomId={roomId}
          username={fullUserInfo.username}
          roomName={roomName}
          onSubmit={addMessage}
          className="input-field"
          />


        </main>
          <UserSideBar
          roomName={roomName}
          rooms={userRooms}
          roomUsers={roomUsers}
          roomDescription={roomDescription}
          userNavSlide={userNavSlide}
          setUserNavSlide={setUserNavSlide}
           />
      </div>

    </div>
  )
}

export default ChatApp;
