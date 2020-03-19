import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import {ChatManager, TokenProvider} from '@pusher/chatkit-client';
import { useAuth0 } from "../react-auth0-spa";
import Modal from 'react-modal';
import CreateRoomForm from './CreateRoomForm';


const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};

Modal.setAppElement('#root')

function SideBar(props) {
  const [currentUser, setCurrentUser] = useState(null);
  const [navSlide, setNavSlide] = useState(false);
  const [rooms, setRooms] = useState([]);
  const [roomId, setRoomId] = useState("");
  const [modalIsOpen,setIsOpen] = useState(false);
  const { isAuthenticated, loginWithRedirect, logout, user} = useAuth0();

  useEffect(() => {
    function removeNavSlide() {
      setNavSlide(false)
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
  }, [])

  function toggleSlide() {
    setNavSlide(prevNavSlide => !prevNavSlide);
  }

  function reloadPage() {
    setTimeout(() => {
      window.location.reload();
    }, 10)
  }

  function openModal() {
    setIsOpen(true);
  }

  function closeModal(){
    setIsOpen(false);
  }

  function handleChange(e) {
    const {value} = e.target;
    setRoomId(value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    currentUser.joinRoom({ roomId: roomId })
    .catch(err => console.log(err))
    setIsOpen(false);
    window.location.reload();
  }

  return (
    <div className="side-bar">
      <div className="side-bar-content">
        <button onClick={toggleSlide} className="open-nav">&#9776;</button>
        <nav className={`nav ${navSlide ? "nav-open" : ""}`}>
          <ul className="nav-list">
            {rooms.map(room => (
              <li key={room.id} onClick={reloadPage} className="nav-item"><Link className="link" to={`/chatapp/${room.id}`}>{room.name}</Link></li>
            ))}
          </ul>
          <button onClick={openModal}>Join Room</button>
          <Modal
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            style={customStyles}
            contentLabel="Room Settings"
          >
            <div className="room-form-modal">
              <h2 className="room-form-header">Join Room</h2>
              <button className="close-room-form" onClick={closeModal}>close</button>

              <div className="room-form-container">
                <form className="room-form">
                  <label>Room Id
                    <input onChange={handleChange} value={roomId} required type="text" name="roomId"/>
                  </label>
                  <button onClick={handleSubmit}>Join Room</button>
                </form>
              </div>
            </div>
          </Modal>
          {user && <CreateRoomForm currentId={user.name}/>}
          {!isAuthenticated && (
            <button onClick={() => loginWithRedirect({})}>Log in</button>
          )}

          {isAuthenticated && <button onClick={() => logout()}>Log out</button>}
        </nav>
      </div>
    </div>
  )
}

export default SideBar;
