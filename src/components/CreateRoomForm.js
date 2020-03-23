import React, {useState, useEffect} from 'react';
import {ChatManager, TokenProvider} from '@pusher/chatkit-client';
import Modal from 'react-modal';
Modal.setAppElement('#root')

function CreateRoomForm(props){
  const [currentUser, setCurrentUser] = useState(null);
  const [modalIsOpen,setIsOpen] = useState(false);
  const [formData, setFormData] = useState({roomName: "", roomDescription: ""});


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
    const {value, name} = e.target;
    setFormData(prevFormData => ({...prevFormData, [name]: value}));
  }

  function handleSubmit(e) {
    e.preventDefault();
    currentUser.createRoom({
      name: formData.roomName,
      private: true,
      customData: {description: formData.roomDescription}
    })
    .catch(err => console.log(err))
    setIsOpen(false);
    setTimeout(() => {
      window.location.reload();
    }, 100);

  }

  return (
    <div>
    {!(currentUser === null)  && (
      <>
      <p onClick={openModal} className="sidebar-modal-header">+ Add a room</p>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Create Room Form"
        className="modal"
        overlayClassName="overlay"
      >
        <div className="room-form-modal">
          <div className="room-form-modal-header">
            <h2 className="room-form-header">Create Room</h2>
            <button className="close-room-form" onClick={closeModal}>X</button>
          </div>

          <div className="room-form-container">
            <form className="room-form">
              <div className="room-form-inputs">
                <div className="input-item">
                  <label className="room-form-label" for="roomName">Name</label>
                  <input maxlength="25" className="input" id="roomName" onChange={handleChange} value={formData.roomName} required type="text" name="roomName"/>
                </div>
                <div className="input-item">
                  <label className="room-form-label" for="roomDescription">Description (Optional)</label>
                  <input maxlength="75" className="input" id="roomDescription" onChange={handleChange} value={formData.roomDescription} type="text" name="roomDescription"/>
                </div>
              </div>
              <button className="room-form-submit" onClick={handleSubmit} >Create Room</button>
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
