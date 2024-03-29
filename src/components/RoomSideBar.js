import React, {useEffect} from 'react';
import {Link, useHistory} from 'react-router-dom';
import { useAuth0 } from "../react-auth0-spa";
import CreateRoomForm from './CreateRoomForm';

function RoomSideBar(props) {
  const { isAuthenticated, loginWithRedirect, logout, user} = useAuth0();
  const history = useHistory();

  useEffect(() => {
    function removeRoomNavSlide() {
      props.setRoomNavSlide(false)
    }

    document.body.addEventListener("click", removeRoomNavSlide);

    return () => document.body.removeEventListener("click", removeRoomNavSlide)
  }, [])

  return (
    <div className="room-side-bar">
      <div className="room-side-bar-content">
        <nav className={`room-side-nav ${props.roomNavSlide ? "room-side-nav-open" : ""}`}>
          <div className="room-side-nav-content">
            <h3 className="room-side-nav-list-header">Rooms</h3>
            <ul className="room-side-nav-list">
              {props.rooms.map(room => (
                <li key={room.roomId} className="room-side-nav-item"><Link className="link" to={`/chatapp/${room.roomName}/${room.roomId}`}># {room.roomName}</Link></li>
              ))}
              {user && <CreateRoomForm setRooms={props.setRooms} rooms={props.rooms} username={props.username}/>}
            </ul>
          </div>

          {isAuthenticated && <button className="logout-btn" onClick={() => logout()}>Log out</button>}
        </nav>
      </div>
    </div>
  )
}

export default RoomSideBar;
