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
  const token = process.env.REACT_APP_MGMT_API_ACCESS_TOKEN;
  const [fullUserInfo, setFullUserInfo] = useState({});
  const [userRooms, setUserRooms] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [currentRoom, setCurrentRoom] = useState({users: []});
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);
  const [roomNavSlide, setRoomNavSlide] = useState(false);
  const [userNavSlide, setUserNavSlide] = useState(false);
  const {roomId} = useParams();
  const {roomName} = useParams();
  const {user} = useAuth0();
  const socket = socketIOClient(`http://127.0.0.1:4001`);

  useEffect(() => {
    const data = {userId: user.name};
    fetch("http://localhost:4001/api/findUser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
      setUserRooms(data.rooms);
    })
  }, []);

  useEffect(() => {
    socket.on("connected", response => {
      console.log(response);
    });

    socket.emit("joined_room", roomId);

    socket.on("message", response => {
      console.log(response);
      setMessages(prevMessages => [...prevMessages, response]);
    })
  }, [roomId]);

  useEffect(() => {
    if(user) {
      console.log(user);
      fetch(`https://dev-pdp1v9a4.auth0.com/api/v2/users/${user.sub}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then(response => response.json())
      .then(data => {
        setFullUserInfo(data);
        console.log(data.username);
      })
      .catch(err => console.log(err))
    }
  }, [user])

  useEffect(() => {
    if(messages.length > 0) {
      window.scrollTo(0, document.body.scrollHeight)
    }
  }, [messages])

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
        currentId={props.currentId}
        username={fullUserInfo.username}
        rooms={userRooms}
        />

        <main className="main">
          <NavBar
          currentRoomId={currentRoom.id}
          currentUser={currentUser}
          toggleUserNavSlide={toggleUserNavSlide}
          toggleRoomNavSlide={toggleRoomNavSlide}
          roomName={roomName}
          />


          <MessageList messages={messages} roomName={roomName}/>
          <Input
          roomId={roomId}
          username={fullUserInfo.username}
          roomName={roomName}
          className="input-field"
          onSubmit={addMessage}
          />


        </main>
        {!(currentRoom.customData === undefined) && (
          <UserSideBar
          roomName={roomName}
          roomDescription={currentRoom.customData.description}
          roomUsers={currentRoom.users}
          userNavSlide={userNavSlide}
          setUserNavSlide={setUserNavSlide}
           />
        )}

      </div>

    </div>
  )
}

export default ChatApp;
