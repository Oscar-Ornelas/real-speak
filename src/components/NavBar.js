import React from 'react';
import RoomSettingsForm from './RoomSettingsForm';

function NavBar(props) {
  return (
    <header className="header">
      <div className="header-content">
        <div className="nav-container">
          <div className="nav-adjacent">
            <button onClick={props.toggleRoomNavSlide} className="open-room-side-nav"><i className="fas fa-bars"></i></button>
            <h2 className="room-header"># {props.roomName}</h2>
          </div>
          <nav className="nav">
            <ul className="nav-list">
              <li className="nav-item" onClick={props.toggleUserNavSlide}><i className="fas fa-user-friends"></i></li>
              <RoomSettingsForm roomName={props.roomName} currentRoomId={props.currentRoomId} currentUser={props.currentUser}/>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  )
}

export default NavBar;
