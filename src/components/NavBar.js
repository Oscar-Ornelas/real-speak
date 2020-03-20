import React from 'react';
import {Link} from 'react-router-dom';
import ChatApp from './ChatApp';
import { useAuth0 } from "../react-auth0-spa";

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
            <li className="nav-item"><i className="fas fa-ellipsis-v"></i></li>
          </ul>
        </nav>
      </div>
    </header>
  )
}

export default NavBar;
