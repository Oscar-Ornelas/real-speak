import React, {useState} from 'react';
import {Switch, Route, Router, useHistory} from 'react-router-dom';
import './App.css';
import Home from './components/Home';
import ExternalApi from './views/ExternalApi';
import ChatApp from './components/ChatApp';
import SideBar from './components/SideBar';
import browserHistory from "./utils/history";

import { default as Chatkit } from '@pusher/chatkit-server';
import { useAuth0 } from "./react-auth0-spa";

function App() {
  const [navSlide, setNavSlide] = useState(false);
  const {loading, user, isAuthenticated, loginWithRedirect} = useAuth0();

  function toggleSlide() {
    setNavSlide(prevNavSlide => !prevNavSlide);
  }

  return (
    <div className="app">
      <Router history={browserHistory}>
        <header>
          {user && <SideBar setNavSlide={setNavSlide} navSlide={navSlide} currentId={user.name}/>}
        </header>
        <Switch>
          <Route path="/" exact>
            {!isAuthenticated ? <button onClick={() => loginWithRedirect({})}>Log in</button> : <Home/>}
          </Route>
          <Route path="/chatapp/:roomId">
            {user && <ChatApp currentId={user.name} toggleSlide={toggleSlide}/>}
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
