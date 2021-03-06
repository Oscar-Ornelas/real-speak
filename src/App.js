import React, {useState, useEffect} from 'react';
import {Switch, Route, Router, useHistory} from 'react-router-dom';
import './App.css';
import Landing from './components/Landing';
import Home from './components/Home';
import ChatApp from './components/ChatApp';
import RoomSideBar from './components/RoomSideBar';
import browserHistory from "./utils/history";

import { useAuth0 } from "./react-auth0-spa";

function App() {
  const [accessToken, setAccessToken] = useState(null);
  const {loading, user, isAuthenticated, loginWithRedirect} = useAuth0();

  useEffect(() => {
    fetch("/api/getAccessToken")
    .then(response => response.json())
    .then(data => setAccessToken(data.access_token))
    .catch(err => console.log(err))
  }, []);

  return (
    <div className="app">
      <Router basename="/real-speak" history={browserHistory}>
        <Switch>
          <Route path="/" exact>
            {!isAuthenticated ? <Landing/> : <Home access_token={accessToken}/>}
          </Route>
          <Route path="/chatapp/:roomName/:roomId">
            {user && <ChatApp access_token={accessToken}/>}
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
