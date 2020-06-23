import React from 'react';

function FlashMessage(props) {
  return (
    <div className="flash-message">
      {props.display && (
        <div className="flash-message-content" style={{"background-color" : (props.successfulAdd ? "#4BB543" : "#F32013")}}>
          <p className="flash-message-text">{props.successfulAdd ? "User added to room" : "User does not exist"}</p>
        </div>
      )}
    </div>
  )
}

export default FlashMessage;
