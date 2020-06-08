import React, {useState, useEffect} from 'react';
import {useHistory, Redirect} from 'react-router-dom';
import { useAuth0 } from "../react-auth0-spa";

function Home(props) {
  const token = process.env.REACT_APP_MGMT_API_ACCESS_TOKEN;
  const [roomId, setRoomId] = useState(Math.floor((Math.random() * 9999999) + 1000000));
  const [roomName, setRoomName] = useState("");
  const [username, setUsername] = useState(null);
  const history = useHistory();
  const {user} = useAuth0();

  useEffect(() => {

    if(user) {
      console.log(user);
      fetch(`https://dev-pdp1v9a4.auth0.com/api/v2/users/${user.sub}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then(response => response.json())
      .then(data => {
        setUsername(data.username);
      })
      .catch(err => console.log(err))
    }
  }, [user])

  useEffect(() => {
    if(user && username) {
      const data = {userId: user.name};
      fetch("http://localhost:4001/api/findUser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      })
      .then(response => response.json())
      .then(responseData => {
        if(responseData.isNewUser) {
          setRoomName("General");
          const data = {roomId, roomName: "General", userId: user.name, username};
          fetch("http://localhost:4001/api/createUser", {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
          })
          .then(() => history.push(`/chatapp/${roomName}/${roomId}`))
          .catch(err => console.log(err))
        } else {
          const data = {roomId: responseData.rooms[0]};
          fetch("http://localhost:4001/api/findRoom", {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
          })
          .then(response => response.json())
          .then(data => {
            console.log(data);
            history.push(`/chatapp/${data.roomName}/${data.roomId}`)
          })
          .catch(err => console.log(err))
        }
      });
    }
  }, [user, username]);

  return (
    <div>
    </div>
  )

}

export default Home;
