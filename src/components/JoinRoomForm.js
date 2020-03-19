import React, {useState, useEffect} from 'react';
import {ChatManager, TokenProvider} from '@pusher/chatkit-client';
import Modal from 'react-modal';
Modal.setAppElement('#root')

function JoinRoomForm(props) {
  const [currentUser, setCurrentUser] = useState(null);
  const [roomId, setRoomId] = useState("");
  const [modalIsOpen,setIsOpen] = useState(false);

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
      })
      .catch(error => console.log(error))
  }, [])

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
    <div>
      {!(currentUser === null) && (
        <>
          <p onClick={openModal} className="sidebar-modal-header">+ Join room</p>
          <Modal
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            contentLabel="Room Settings"
            className="modal"
            overlayClassName="overlay"
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
        </>
      )}
    </div>
  )
}

export default JoinRoomForm;
