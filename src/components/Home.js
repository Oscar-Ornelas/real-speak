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
  const [currentRoomId, setCurrentRoomId] = useState('');
  const history = useHistory();

  return (
    <div>
      {currentRoomId !== undefined && <Redirect to={`/chatapp/123`}/>}
    </div>

  )

}

export default Home;
