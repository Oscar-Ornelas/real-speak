import React, {useState} from 'react';
import Modal from 'react-modal';
Modal.setAppElement('#root');

function DeleteRoomForm(props) {
  const [modalIsOpen,setIsOpen] = useState(false);

  function openModal(e) {
    e.preventDefault();
    setIsOpen(true);
  }

  function closeModal(){
    setIsOpen(false);
  }

  return (
    <div className="delete-room-modal">
      <button className="room-form-submit room-form-delete" onClick={openModal}>Delete Room</button>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Room Settings"
        className="modal"
        overlayClassName="overlay"
      >
        <div className="room-form-modal">
          <div className="room-form-modal-header">
            <h2 className="room-form-header">Delete Room</h2>
            <button className="close-room-form" onClick={closeModal}>X</button>
          </div>

          <div className="room-form-container delete-form-container">
            <p className="delete-disclaimer">Are you sure you want to delete <strong>#{props.roomName}</strong>?</p>
            <button className="room-form-submit room-form-delete" onClick={props.deleteRoom}>Delete Room</button>
          </div>
        </div>
      </Modal>
    </div>
  )
}

export default DeleteRoomForm;
