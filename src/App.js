import React, {useState} from 'react';
import ChatMessage from './ChatMessage';
import SignUp from './SignUp';
import ChatApp from './ChatApp';

import { default as Chatkit } from '@pusher/chatkit-server';

const chatkit = new Chatkit({
  instanceLocator: process.env.REACT_APP_CHATKIT_INSTANCE_LOCATOR_KEY,
  key: process.env.REACT_APP_CHATKIT_SECRET_KEY
})

function App() {
  const [currentView, setCurrentView] = useState('signup');
  const [currentId, setCurrentId] = useState('');
  const [currentUsername, setCurrentUsername] = useState('');

  function createUser(username) {
      chatkit.createUser({
          id: username,
          name: username,
      })
      .then((currentUser) => {
          setCurrentUsername(username);
          setCurrentId(username);
          setCurrentView('chatApp');
      }).catch((err) => {
          if(err.status === 400) {
            setCurrentUsername(username);
            setCurrentId(username);
            setCurrentView('chatApp');
          } else {
            console.log(err.status);
          }
      });
  }


  let view = '';
  if (currentView === "ChatMessage") {
      view = <ChatMessage  setCurrentView={setCurrentView}/>
  } else if (currentView === "signup") {
      view = <SignUp onSubmit={createUser}/>
  } else if (currentView === "chatApp") {
      view = <ChatApp currentId={currentId}/>
  }

  return (
      <div className="App">
          {view}
      </div>
  );

}

export default App;
