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
    <div>
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

          <div className="room-form-container">
            <form className="room-form">
              <button className="room-form-submit" onClick={props.deleteRoom}>Delete Room</button>
            </form>
          </div>
        </div>
      </Modal>
    </div>
  )
}

export default DeleteRoomForm;
