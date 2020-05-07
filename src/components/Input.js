import React, {useState} from 'react';

function Input(props) {
  const [message, setMessage] = useState("");

  function handleChange(e) {
    const {value} = e.target;
    setMessage(value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.onSubmit(message);
    setMessage("");
  }

  return (
    <div className="form-container">
      <div className="form-content">
        <form onSubmit={handleSubmit} className="input-field">
            <input type="text" className="message-input" onChange={handleChange} value={message} placeholder={`Message #${props.roomName}`} />
            <button className="message-submit"><i className="fas fa-paper-plane"></i></button>
        </form>
      </div>
    </div>
  )

}
export default Input;
