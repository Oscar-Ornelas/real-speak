import React from 'react';
import { useAuth0 } from "../react-auth0-spa";

function Landing() {
  const {loginWithRedirect} = useAuth0();

  return (
    <div className="landing">
      <h1 className="logo">RealSpeak</h1>
      <h2 className="landing-header">A new way to chat with your communities and friends.</h2>
      <p className="landing-subtitle">RealSpeak is the easiest way to communicate over voice, video, and text,
      whether you’re part of a school club, a nightly gaming group, a worldwide
      art community, or just a handful of friends that want to hang out.
      </p>
      <button onClick={() => loginWithRedirect({})}>Log in</button>
    </div>
  )
}

export default Landing;
