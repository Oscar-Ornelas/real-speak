import React, {useRef, useEffect} from 'react';

function MessageList(props) {
  const messagesEnd = useRef(null);

  useEffect(scrollToBottom, [props.messages]);

  function scrollToBottom() {
    messagesEnd.current.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <ul className="message-list">
        {props.messages.length === 0 && (
          <li className="message-welcome">
            <h2 className="room-header"># {props.roomName}</h2>
            <p>Welcome to the <strong># {props.roomName}</strong> room!</p>
          </li>
        )}
        {props.messages.map((message, index, messages) => (
          <li className="message-item" key={index}>
            <div className="message-item-content">
              {index > 0 ? messages[index - 1].username !== message.username && <h3 className="message-sender">{message.username}</h3>
              : <h3 className="message-sender">{message.username}</h3>}
              <p className="message-text">{message.text}</p>
            </div>
          </li>
        ))}
        <li ref={messagesEnd}></li>
    </ul>
  )
}

export default MessageList;
