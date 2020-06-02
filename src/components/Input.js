import React, {useState, useEffect} from 'react';

function Input(props) {
  const [messageInfo, setMessageInfo] = useState({username: "", timeSent: "", text: "", roomId: ""});

  useEffect(() => {
    if(props.username) {
      setMessageInfo(prevMessageInfo => ({...prevMessageInfo, username: props.username}));
    }

    if(props.roomId) {
      setMessageInfo(prevMessageInfo => ({...prevMessageInfo, roomId: props.roomId}));
    }
  }, [props.username, props.roomId]);

  function handleChange(e) {
    const {value} = e.target;
    setMessageInfo(prevMessageInfo => ({...prevMessageInfo, text: value}));
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.onSubmit(messageInfo);
    setMessageInfo(prevMessageInfo => ({...prevMessageInfo, timeSent: "", text: ""}));
  }

  return (
    <div className="form-container">
      <div className="form-content">
        <form onSubmit={handleSubmit} className="input-field">
            <input type="text" className="message-input" onChange={handleChange} value={messageInfo.text} placeholder={`Message #${props.roomName}`} />
            <button className="message-submit"><i className="fas fa-paper-plane"></i></button>
        </form>
      </div>
    </div>
  )

}
export default Input;
