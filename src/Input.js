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
    <form onSubmit={handleSubmit} className="input-field">
        <input className="message-input" type="text" onChange={handleChange} value={message}/>
        <input className="message-submit" type="submit" value="send" />
    </form>
  )

}
export default Input;
