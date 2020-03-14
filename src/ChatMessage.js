import React from 'react';

function ChatMessage(props) {

    function changeView() {
      props.setCurrentView('signup');
    }

    return (
      <div>
          <button className="chat-button" onClick={changeView}>Send a message</button>
      </div>
    )

}

export default ChatMessage;
