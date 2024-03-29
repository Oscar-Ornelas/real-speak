import React, {useState} from 'react';
import {useHistory} from 'react-router-dom';
import { useAuth0 } from "../react-auth0-spa";
import Modal from 'react-modal';
Modal.setAppElement('#root')

function CreateRoomForm(props){
  const {user} = useAuth0();
  const [modalIsOpen,setIsOpen] = useState(false);
  const [formData, setFormData] = useState({roomName: "", roomDescription: ""});
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

  function handleSubmit(e) {
    const roomId = Math.floor((Math.random() * 9999999) + 1000000);
    const roomName = formData.roomName;
    const roomDescription = formData.roomDescription;
    const data = {userId: user.name, roomId, roomName, roomDescription, username: props.username};
    e.preventDefault();
    fetch("/api/addRoom", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
      history.push(`/chatapp/${data.roomName}/${data.roomId}`);
      const newData = {userId: user.name};
      fetch("/api/findUser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(newData)
      })
      .then(response => response.json())
      .then(data => {
        props.setRooms([]);
        data.rooms.forEach(room => {
          const data = {roomId: room}
          fetch("/api/findRoom", {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
          })
          .then(response => response.json())
          .then(data => props.setRooms(prevRooms => [...prevRooms, data]));
        })
      })
    })
    .catch(err => console.log(err))
    setIsOpen(false);
  }

  return (
    <div>
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
                  <label className="room-form-label" htmlFor="roomName">Name</label>
                  <input maxlength="25" className="input" id="roomName" onChange={handleChange} value={formData.roomName} required type="text" name="roomName"/>
                </div>
                <div className="input-item">
                  <label className="room-form-label" htmlFor="roomDescription">Description (Optional)</label>
                  <input maxLength="75" className="input" id="roomDescription" onChange={handleChange} value={formData.roomDescription} type="text" name="roomDescription"/>
                </div>
              </div>
              <button className="room-form-submit" onClick={handleSubmit} >Create Room</button>
            </form>
          </div>
        </div>
      </Modal>
      </>


    </div>
  );
}

export default CreateRoomForm;
