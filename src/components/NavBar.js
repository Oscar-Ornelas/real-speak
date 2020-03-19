import React from 'react';
import {Link} from 'react-router-dom';
import ChatApp from './ChatApp';
import { useAuth0 } from "../react-auth0-spa";

function NavBar() {
  const { isAuthenticated, loginWithRedirect, logout } = useAuth0();

  return (
    <div>
      {!isAuthenticated && (
        <button onClick={() => loginWithRedirect({})}>Log in</button>
      )}

      {isAuthenticated && <button onClick={() => logout()}>Log out</button>}

      {isAuthenticated && (
        <span>
          <Link className="link" to="/">Home</Link>
        </span>
      )}
    </div>
  )

}

export default NavBar;
