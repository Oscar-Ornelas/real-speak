import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import {ChatManager, TokenProvider} from '@pusher/chatkit-client';
import { useAuth0 } from "../react-auth0-spa";
import CreateRoomForm from './CreateRoomForm';
import JoinRoomForm from './JoinRoomForm';

function SideBar(props) {
  const [currentUser, setCurrentUser] = useState(null);
  const [rooms, setRooms] = useState([]);
  const { isAuthenticated, loginWithRedirect, logout, user} = useAuth0();

  useEffect(() => {
    function removeNavSlide() {
      props.setNavSlide(false)
    }

    document.body.addEventListener("click", removeNavSlide);

    return () => document.body.removeEventListener("click", removeNavSlide)
  }, [])

  useEffect(() => {
    const chatManager = new ChatManager({
        instanceLocator: process.env.REACT_APP_CHATKIT_INSTANCE_LOCATOR_KEY,
        userId: props.currentId,
        tokenProvider: new TokenProvider({
            url: process.env.REACT_APP_TEST_TOKEN
        })
    })

    chatManager
      .connect()
      .then(currentUser => {
          setCurrentUser(currentUser);
          setRooms(currentUser.rooms);
      })
      .catch(error => console.log(error))
  }, [rooms])

  function reloadPage() {
    setTimeout(() => {
      window.location.reload();
    }, 10)
  }

  return (
    <div className="side-bar">
      <div className="side-bar-content">
        <nav className={`side-nav ${props.navSlide ? "side-nav-open" : ""}`}>
          <div className="side-nav-content">
            <h3 className="side-nav-list-header">Rooms</h3>
            <ul className="side-nav-list">
              {rooms.map(room => (
                <li key={room.id} onClick={reloadPage} className="side-nav-item"><Link className="link" to={`/chatapp/${room.id}`}># {room.name}</Link></li>
              ))}
              {user && <CreateRoomForm currentId={user.name}/>}
              {user && <JoinRoomForm currentId={user.name}/>}
            </ul>
          </div>


          {!isAuthenticated && (
            <button onClick={() => loginWithRedirect({})}>Log in</button>
          )}

          {isAuthenticated && <button className="logout-btn" onClick={() => logout()}>Log out</button>}
        </nav>
      </div>
    </div>
  )
}

export default SideBar;
