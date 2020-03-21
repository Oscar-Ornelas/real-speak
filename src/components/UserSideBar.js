import React, {useState, useEffect} from 'react';

function UserSideBar(props) {

  useEffect(() => {
    function removeUserNavSlide() {
      props.setUserNavSlide(false)
    }

    document.body.addEventListener("click", removeUserNavSlide);

    return () => document.body.removeEventListener("click", removeUserNavSlide)
  }, [])

  return (
    <div className="user-side-bar">
      <div className="user-side-bar-content">
        <nav className={`user-side-nav ${props.userNavSlide ? "user-side-nav-open" : ""}`}>
          <div className="user-side-nav-content">
            <h3 className="user-side-nav-list-header">Users</h3>
            <ul className="user-side-nav-list">
              {props.roomUsers.map(user => (
                <li>{user.name}</li>
              ))}
            </ul>
          </div>
        </nav>
      </div>
    </div>
  )
}

export default UserSideBar;
