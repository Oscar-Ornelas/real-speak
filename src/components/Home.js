import React, {useState, useEffect} from 'react';
import {useHistory, Redirect} from 'react-router-dom';
import {ChatManager, TokenProvider} from '@pusher/chatkit-client';
import { default as Chatkit } from '@pusher/chatkit-server';
import { useAuth0 } from "../react-auth0-spa";

const chatkit = new Chatkit({
  instanceLocator: process.env.REACT_APP_CHATKIT_INSTANCE_LOCATOR_KEY,
  key: process.env.REACT_APP_CHATKIT_SECRET_KEY
})

function Home(props) {
  const token = process.env.REACT_APP_MGMT_API_ACCESS_TOKEN;
  const INSTANCE_ID = process.env.REACT_APP_CHATKIT_INSTANCE_ID;
  const [isChatkitUser, setIsChatkitUser] = useState(false);
  const [chatkitUser, setChatkitUser] = useState({});
  const [fullUserInfo, setFullUserInfo] = useState({});
  const [currentRoomId, setCurrentRoomId] = useState('');
  const history = useHistory();
  const {user} = useAuth0();

  useEffect(() => {
    if(user) {
      fetch(`https://realspeak.auth0.com/api/v2/users/${user.sub}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then(response => response.json())
      .then(data => setFullUserInfo(data))
    }
  }, [user])

  useEffect(() => {
    if(user) {
      fetch(`https://us1.pusherplatform.io/services/chatkit/v7/${INSTANCE_ID}/users/${user.email}`)
      .then(response => response.json())
      .then(data => {
        setChatkitUser(data);
        setIsChatkitUser(chatkitUser.custom_data.email === user.email)
      })
      .catch(err => setIsChatkitUser(false))

      if(!isChatkitUser) {
        chatkit.createUser({
          id: user.email,
          name: fullUserInfo.username
        })
      }
    }
  }, [fullUserInfo])

  useEffect(() => {
    if(user) {
      const chatManager = new ChatManager({
          instanceLocator: process.env.REACT_APP_CHATKIT_INSTANCE_LOCATOR_KEY,
          userId: user.email,
          tokenProvider: new TokenProvider({
              url: process.env.REACT_APP_TEST_TOKEN
          })
      })

      chatManager
      .connect()
      .then(currentUser => {
        if(currentUser.rooms.length < 1) {
          currentUser.createRoom({
            name: 'General',
            private: false
          })
          .then(room => history.push(`/chatapp/${room.id}`))
        }
        setCurrentRoomId(currentUser.rooms[0].id);
      })
    }
  }, [fullUserInfo]);

  return (
    <div>
      {currentRoomId !== '' && <Redirect to={`/chatapp/${currentRoomId}`}/>}
    </div>

  )

}

export default Home;
