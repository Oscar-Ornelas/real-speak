import React, {useState, useEffect} from 'react';
import {useHistory, Redirect} from 'react-router-dom';
import { useAuth0 } from "../react-auth0-spa";

function Home(props) {
  const roomId = Math.floor((Math.random() * 9999999) + 1000000);
  const history = useHistory();

  return (
    <div>
      {roomId !== undefined && <Redirect to={`/chatapp/${roomId}`}/>}
    </div>

  )

}

export default Home;
