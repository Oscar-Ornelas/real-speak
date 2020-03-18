import React from 'react';

function SideBar(props) {
  return (
    <div className="side-bar">
      <div className="side-bar-content">
        <button className="open-nav">&#9776;</button>
        <nav className="nav">
          <button className="close-nav">&times;</button>
          <ul className="nav-list">
            <li className="nav-item">Room 1</li>
            <li className="nav-item">Room 2</li>
            <li className="nav-item">Room 3</li>
          </ul>
        </nav>
      </div>
    </div>
  )
}

export default SideBar;
