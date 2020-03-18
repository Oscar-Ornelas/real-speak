import React, {useState, useEffect} from 'react';
import { default as Chatkit } from '@pusher/chatkit-server';
import { useAuth0 } from "../react-auth0-spa";
import CreateRoomForm from './CreateRoomForm';

const chatkit = new Chatkit({
  instanceLocator: process.env.REACT_APP_CHATKIT_INSTANCE_LOCATOR_KEY,
  key: process.env.REACT_APP_CHATKIT_SECRET_KEY
})

function Home(props) {
  const token = process.env.REACT_APP_MGMT_API_ACCESS_TOKEN;
  const INSTANCE_ID = process.env.REACT_APP_CHATKIT_INSTANCE_ID;
  const [isChatkitUser, setIsChatkitUser] = useState(false);
  const [chatkitUser, setChatkitUser] = useState({});
  const {user} = useAuth0();
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

  return (
    <div>
      {user && <CreateRoomForm currentId={user.name}/>}
    </div>
  );

}

export default Home;
