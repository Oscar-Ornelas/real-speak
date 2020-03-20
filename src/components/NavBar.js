import React from 'react';
import RoomSettingsForm from './RoomSettingsForm';

function NavBar(props) {
  return (
    <header className="header">
      <div className="nav-container">
        <div className="nav-adjacent">
          <button onClick={props.toggleSlide} className="open-side-nav"><i className="fas fa-bars"></i></button>
          <h2 className="room-header"># {props.roomName}</h2>
        </div>
        <nav className="nav">
          <ul className="nav-list">
            <li className="nav-item"><i className="fas fa-user-friends"></i></li>
            <RoomSettingsForm roomName={props.roomName} currentRoomId={props.currentRoomId} currentUser={props.currentUser}/>
          </ul>
        </nav>
      </div>
    </header>
  )
}

export default NavBar;
