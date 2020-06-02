import React, {useState, useEffect} from 'react';
import {useHistory, Redirect} from 'react-router-dom';
import { useAuth0 } from "../react-auth0-spa";

function Home(props) {
  const history = useHistory();

  return (
    <div>
      <Redirect to={"/chatapp"}/>
    </div>

  )

}

export default Home;
