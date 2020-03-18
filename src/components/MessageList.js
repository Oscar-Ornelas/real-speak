import React from 'react';

function MessageList(props) {
  return (
    <ul className="message-list">
        {props.messages.map((message, index) => (
            <li className="message-item" key={index}>
              <div className="message-item-content">
                <h3 className="message-sender">{message.sender.name}</h3>
                <p className="message-text">{message.text}</p>
              </div>
            </li>
        ))}
        <li></li>
    </ul>
  )
}

export default MessageList;
