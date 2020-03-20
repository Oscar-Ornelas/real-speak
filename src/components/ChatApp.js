import React, {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import {ChatManager, TokenProvider} from '@pusher/chatkit-client';
import useApiCall from '../views/useApiCall';
import {useAuth0} from "../react-auth0-spa";
import NavBar from './NavBar';
import RoomSideBar from './RoomSideBar';
import MessageList from './MessageList';
import Input from './Input';

function ChatApp(props) {
  const [currentUser, setCurrentUser] = useState(null);
  const [currentRoom, setCurrentRoom] = useState({users: []});
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);
  const {roomId} = useParams();

  useEffect(() => {
    const chatManager = new ChatManager({
        instanceLocator: process.env.REACT_APP_CHATKIT_INSTANCE_LOCATOR_KEY,
        userId: props.currentId,
        tokenProvider: new TokenProvider({
            url: process.env.REACT_APP_TEST_TOKEN
        })
    })

    chatManager
      .connect()
      .then(currentUser => {
          setCurrentUser(currentUser);
          return currentUser.subscribeToRoom({
              roomId: roomId,
              messageLimit: 100,
              hooks: {
                  onMessage: message => {
                      setMessages(prevMessages => [...prevMessages, message])
                  },
              }
          })
      })
      .then(currentRoom => {
          setCurrentRoom(currentRoom);
          setUsers(currentRoom.userIds);
          window.scrollTo(0,document.body.scrollHeight)
      })
      .catch(error => console.log(error))
  }, [])

  useEffect(() => {
    if(messages.length > 0) {
      window.scrollTo(0,document.body.scrollHeight)
    }
  }, [messages])

  function addMessage(text) {
    currentUser.sendMessage({
      text,
      roomId: currentRoom.id
    })
    .catch(error => console.error('error', error));
  }

  return (
    <div>
      <header>
        <NavBar currentRoomId={currentRoom.id} currentUser={currentUser} toggleSlide={props.toggleSlide} roomName={currentRoom.name}/>
        <RoomSideBar setNavSlide={props.setNavSlide} navSlide={props.navSlide} currentId={props.currentId}/>
      </header>
      <main className="chat-box">
      {!(currentRoom.name === undefined) && (
        <>
          <MessageList messages={messages} roomName={currentRoom.name}/>
          <Input roomName={currentRoom.name} className="input-field" onSubmit={addMessage} />
        </>
      )}
      </main>
    </div>
  )
}

export default ChatApp;
