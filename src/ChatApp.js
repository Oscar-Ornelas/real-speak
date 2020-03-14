import React, {useState, useEffect} from 'react';
import {ChatManager, TokenProvider} from '@pusher/chatkit-client';
import MessageList from './MessageList';
import Input from './Input';

function ChatApp(props) {
  const [currentUser, setCurrentUser] = useState(null);
  const [currentRoom, setCurrentRoom] = useState({users: []});
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);

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
              roomId: "20f9a93b-ec42-4b89-97a1-cd982d68c35f",
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
      })
      .catch(error => console.log(error))
  }, [])

  function addMessage(text) {
    currentUser.sendMessage({
      text,
      roomId: currentRoom.id
    })
    .catch(error => console.error('error', error));
  }

  return (
    <div>
      <h2 className="header">Hi There, Ask us anything</h2>
      <MessageList messages={messages} />
      <Input className="input-field" onSubmit={addMessage} />
    </div>
  )
}

export default ChatApp;
