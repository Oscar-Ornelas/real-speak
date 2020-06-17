import React, {useState, useEffect} from 'react';
import {useHistory} from 'react-router-dom';
import Modal from 'react-modal';
Modal.setAppElement('#root');

function RoomSettingsForm(props) {
  const [formData, setFormData] = useState({newUserID: "", userId: "", newRoomName: ""});
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
    fetch("http://localhost:4001/api/addUserToRoom", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
    setIsOpen(false);
    setFormData(prevFormData => ({...prevFormData, newUserId: ""}));
  }

  return (
    <div>
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

                {/*<div className="input-item">
                  <label className="room-form-label" for="userId">Remove user</label>
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
                <button className="room-form-submit" onClick={"Remove User"}>Remove User</button>
              */}
              </div>
            </form>
          </div>
        </div>
      </Modal>
    </div>
  )
}

export default RoomSettingsForm;
