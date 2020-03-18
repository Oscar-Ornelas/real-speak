import React, {useState, useEffect} from 'react';
import {useHistory} from 'react-router-dom';

import { default as Chatkit } from '@pusher/chatkit-server';
import { useAuth0 } from "../react-auth0-spa";

const chatkit = new Chatkit({
  instanceLocator: process.env.REACT_APP_CHATKIT_INSTANCE_LOCATOR_KEY,
  key: process.env.REACT_APP_CHATKIT_SECRET_KEY
})

function Home() {
  const token = process.env.REACT_APP_MGMT_API_ACCESS_TOKEN;
  const INSTANCE_ID = process.env.REACT_APP_CHATKIT_INSTANCE_ID;
  const history = useHistory();
  const [isChatkitUser, setIsChatkitUser] = useState(false);
  const [chatkitUser, setChatkitUser] = useState({});
  const { loading, user } = useAuth0();
  const [fullUser, setFullUser] = useState({});

  useEffect(() => {
    if(user) {
      fetch(`https://realspeak.auth0.com/api/v2/users/${user.sub}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then(response => response.json())
      .then(data => setFullUser(data))
    }
  }, [user])

  useEffect(() => {
    if(user) {
      fetch(`https://us1.pusherplatform.io/services/chatkit/v7/${INSTANCE_ID}/users/${user.email}`)
      .then(response => response.json())
      .then(data => {
        setChatkitUser(data);
        setIsChatkitUser(chatkitUser.custom_data.email === user.email);
      })
      .catch(err => setIsChatkitUser(false))

      if(!isChatkitUser) {
        chatkit.createUser({
          id: user.email,
          name: fullUser.username
        })
      }

    }
  }, [fullUser])

  console.log(fullUser);

  return null;

}

export default Home;
