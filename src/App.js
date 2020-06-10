import React, {useState, useEffect} from 'react';
import {Switch, Route, HashRouter as Router, useHistory} from 'react-router-dom';
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

  return (
    <div className="app">
      <Router basename="/real-speak" history={browserHistory}>
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
