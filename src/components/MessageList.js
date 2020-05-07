import React from 'react';

function MessageList(props) {
  return (
    <ul className="message-list">
        {props.messages.length === 0 && (
          <li className="message-welcome">
            <h2 className="room-header"># {props.roomName}</h2>
            <p>Welcome to the <strong># {props.roomName}</strong> room!</p>
          </li>
        )}
        {props.messages.map((message, index) => (
          <li className="message-item" key={index}>
            <div className="message-item-content">
              {/*<h3 className="message-sender">{message.sender.name}</h3>*/}
              <p className="message-text">{message}</p>
            </div>
          </li>
        ))}
        <li></li>
    </ul>
  )
}

export default MessageList;
