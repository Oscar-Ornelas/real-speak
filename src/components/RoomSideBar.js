import React, {useEffect} from 'react';
import {Link} from 'react-router-dom';
import { useAuth0 } from "../react-auth0-spa";
import CreateRoomForm from './CreateRoomForm';

function RoomSideBar(props) {
  const { isAuthenticated, loginWithRedirect, logout, user} = useAuth0();

  useEffect(() => {
    function removeRoomNavSlide() {
      props.setRoomNavSlide(false)
    }

    document.body.addEventListener("click", removeRoomNavSlide);

    return () => document.body.removeEventListener("click", removeRoomNavSlide)
  }, [])

  function reloadPage() {
    setTimeout(() => {
      window.location.reload();
    }, 100)
  }

  return (
    <div className="room-side-bar">
      <div className="room-side-bar-content">
        <nav className={`room-side-nav ${props.roomNavSlide ? "room-side-nav-open" : ""}`}>
          <div className="room-side-nav-content">
            <h3 className="room-side-nav-list-header">Rooms</h3>
            <ul className="room-side-nav-list">
              {props.rooms.map(room => (
                <li key={room.roomId} onClick={reloadPage} className="room-side-nav-item"><Link className="link" to={`/chatapp/${room.roomName}/${room.roomId}`}># {room.roomName}</Link></li>
              ))}
              {user && <CreateRoomForm username={props.username}/>}
            </ul>
          </div>

          {isAuthenticated && <button className="logout-btn" onClick={() => logout()}>Log out</button>}
        </nav>
      </div>
    </div>
  )
}

export default RoomSideBar;
