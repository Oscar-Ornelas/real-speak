import React, {useState, useEffect} from 'react';
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
      <button onClick={openModal}>Settings</button>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Room Settings"
      >
        <div className="room-form-modal">
          <h2 className="room-form-header">Settings</h2>
          <button className="close-room-form" onClick={closeModal}>close</button>

          <div className="room-form-container">
            <form className="room-form">
              <label>User Id
                <input onChange={handleChange} value={newUserId} required type="text" name="newUserId"/>
              </label>
              <button onClick={handleSubmit}>Add User</button>
            </form>
          </div>
        </div>
      </Modal>
    </div>
  )
}

export default RoomSettingsForm;
