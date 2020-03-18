import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';

function SideBar(props) {
  const [navSlide, setNavSlide] = useState(false);

  function toggleSlide() {
    setNavSlide(prevNavSlide => !prevNavSlide);
  }

  useEffect(() => {
    function removeNavSlide() {
      setNavSlide(false)
    }

    document.body.addEventListener("click", removeNavSlide);

    return () => document.body.removeEventListener("click", removeNavSlide)
  }, [])


  return (
    <div className="side-bar">
      <div className="side-bar-content">
        <button onClick={toggleSlide} className="open-nav">&#9776;</button>
        <nav className={`nav ${navSlide ? "nav-open" : ""}`}>
          <ul className="nav-list">
            <li className="nav-item"><Link className="link" to="/chatapp">General</Link></li>
            <li className="nav-item">Room 2</li>
            <li className="nav-item">Room 3</li>
          </ul>
        </nav>
      </div>
    </div>
  )
}

export default SideBar;
