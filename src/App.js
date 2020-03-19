import React, {useState} from 'react';
import {Switch, Route, Router, useHistory} from 'react-router-dom';
import './App.css';
import NavBar from './components/NavBar';
import Home from './components/Home';
import ExternalApi from './views/ExternalApi';
import ChatApp from './components/ChatApp';
import Profile from './components/Profile';
import SideBar from './components/SideBar';
import browserHistory from "./utils/history";

import { default as Chatkit } from '@pusher/chatkit-server';
import { useAuth0 } from "./react-auth0-spa";

function App() {
  const { loading, user } = useAuth0();

  return (
    <div className="app">
      <Router history={browserHistory}>
        <header>
          <NavBar/>
          {user && <SideBar currentId={user.name}/>}
        </header>
        <Switch>
          <Route path="/" exact>
            <Home/>
          </Route>
          <Route path="/profile" component={Profile} />
          <Route path="/chatapp/:roomId">
            {user && <ChatApp currentId={user.name}/>}
          </Route>
          <Route path="/external-api">
            <ExternalApi/>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
