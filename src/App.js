import React, {useState} from 'react';
import {Switch, Route, Router, useHistory} from 'react-router-dom';
import './App.css';
import ChatMessage from './components/ChatMessage';
import Home from './components/Home';
import ExternalApi from './views/ExternalApi';
import ChatApp from './components/ChatApp';
import Profile from "./components/Profile";
import browserHistory from "./utils/history";

import { default as Chatkit } from '@pusher/chatkit-server';
import { useAuth0 } from "./react-auth0-spa";

function App() {
  const { loading, user } = useAuth0();

  return (
    <div className="App">
      <Router history={browserHistory}>
        <header>
          <ChatMessage/>
        </header>
        <Switch>
          <Route path="/" exact>
            <Home/>
          </Route>
          <Route path="/profile" component={Profile} />
          <Route path="/chatapp">
            <ChatApp currentId={user ? user.name : ""}/>
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
