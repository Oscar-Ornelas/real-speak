import React, {useState, useEffect} from 'react';
import {useHistory} from 'react-router-dom';
import Modal from 'react-modal';
import FlashMessage from './FlashMessage';
Modal.setAppElement('#root');

function RoomSettingsForm(props) {
  const [formData, setFormData] = useState({newUserID: "", userId: "", newRoomName: ""});
  const [successfulAdd, setSuccessfulAdd] = useState(false);
  const [display, setDisplay] = useState(false);
  const [modalIsOpen,setIsOpen] = useState(false);
  const history = useHistory();

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

  function addUser(e) {
    const data = {userId: formData.userId, roomId: props.roomId};
    e.preventDefault();
    fetch("/api/addUserToRoom", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
      setSuccessfulAdd(data.successfulAdd);
      setDisplay(true);
      setTimeout(() => setDisplay(false), 2500);
    })
    setIsOpen(false);
    setFormData(prevFormData => ({...prevFormData, userId: ""}));
  }

  function leaveRoom(e) {
    console.log(props.userId);
    const data = {userId: props.userId, roomId: props.roomId};
    e.preventDefault();
    fetch("/api/removeUserFromRoom", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
    .then(() => history.push("/"))
    setIsOpen(false);

  }

  return (
    <div>
      <FlashMessage display={display} successfulAdd={successfulAdd}/>
      <button className="navbar-modal-btn" onClick={openModal}><i className="fas fa-ellipsis-v"></i></button>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Room Settings"
        className="modal"
        overlayClassName="overlay"
      >
        <div className="room-form-modal">
          <div className="room-form-modal-header">
            <h2 className="room-form-header">Settings</h2>
            <button className="close-room-form" onClick={closeModal}>X</button>
          </div>
          <div className="room-form-container">
            <form className="room-form">
              <div className="room-form-inputs">

                <div className="input-item">
                  <label className="room-form-label" for="userId">Add user</label>
                  <input
                    placeholder="User Id (Email)"
                    className="input"
                    id="userId"
                    onChange={handleChange}
                    value={formData.userId}
                    type="text"
                    name="userId"
                  />
                </div>
                <button className="room-form-submit" onClick={addUser}>Add User</button>


                <button className="room-form-delete room-form-submit" onClick={leaveRoom}>Leave Room</button>

              </div>
            </form>
          </div>
        </div>
      </Modal>
    </div>
  )
}

export default RoomSettingsForm;
