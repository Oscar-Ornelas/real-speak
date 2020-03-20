import React, {useState, useEffect} from 'react';
import Modal from 'react-modal';
Modal.setAppElement('#root')

function RoomSettingsForm(props) {
  const [newUserId, setNewUserId] = useState("");
  const [modalIsOpen,setIsOpen] = useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal(){
    setIsOpen(false);
  }

  function handleChange(e) {
    const {value} = e.target;
    setNewUserId(value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.currentUser.addUserToRoom({
      userId: newUserId,
      roomId: props.currentRoomId
    })
    .catch(err => console.log(err))
    setIsOpen(false);
    setNewUserId("");
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
                  <label className="room-form-label" for="newUserId">User Id</label>
                  <input className="input" id="newUserId" onChange={handleChange} value={newUserId} required type="text" name="newUserId"/>
                </div>
              </div>
              <button className="room-form-submit" onClick={handleSubmit}>Add User</button>
            </form>
          </div>
        </div>
      </Modal>
    </div>
  )
}

export default RoomSettingsForm;
