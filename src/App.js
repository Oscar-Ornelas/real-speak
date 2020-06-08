import React, {useState, useEffect} from 'react';
import {Switch, Route, Router, useHistory} from 'react-router-dom';
import './App.css';
import Landing from './components/Landing';
import Home from './components/Home';
import ExternalApi from './views/ExternalApi';
import ChatApp from './components/ChatApp';
import RoomSideBar from './components/RoomSideBar';
import browserHistory from "./utils/history";

import { default as Chatkit } from '@pusher/chatkit-server';
import { useAuth0 } from "./react-auth0-spa";

function App() {
  const {loading, user, isAuthenticated, loginWithRedirect} = useAuth0();

  /*useEffect(() => {
    const data = {roomId: 8773944};
    fetch("http://localhost:4001/api/findRoom", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(err => console.log(err))
  }, []);*/

  return (
    <div className="app">
      <Router history={browserHistory}>
        <Switch>
          <Route path="/" exact>
            {!isAuthenticated ? <Landing/> : <Home/>}
          </Route>
          <Route path="/chatapp/:roomName/:roomId">
            {user && <ChatApp currentId={user.name}/>}
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
