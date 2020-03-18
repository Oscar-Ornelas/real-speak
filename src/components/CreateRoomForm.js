import React, {useState, useEffect} from 'react';
import {ChatManager, TokenProvider} from '@pusher/chatkit-client';
import Modal from 'react-modal';

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

function CreateRoomForm(props){
  const [currentUser, setCurrentUser] = useState(null);
  const [modalIsOpen,setIsOpen] = useState(false);
  const [roomName, setRoomName] = useState("");


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
    setRoomName(value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    currentUser.createRoom({
      name: roomName,
      private: false,
    })
    .catch(err => console.log(err))
    setIsOpen(false);
  }

  return (
    <div>
    {!(currentUser === null)  && (
      <>
      <button onClick={openModal}>Open Modal</button>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Create Room Form"
      >
        <div className="room-form-modal">
          <h2 className="room-form-header">Create Room</h2>
          <button className="close-room-form" onClick={closeModal}>close</button>

          <div className="room-form-container">
            <form className="room-form">
              <label>Room Name
                <input onChange={handleChange} value={roomName} required type="text" name="roomName"/>
              </label>


              <button onClick={handleSubmit} >Create Room</button>
            </form>
          </div>
        </div>
      </Modal>
      </>
    )}

    </div>
  );
}

export default CreateRoomForm;
