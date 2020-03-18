import {useState, useEffect} from 'react';
import { useAuth0 } from "../react-auth0-spa";

function useApiCall() {
  const { getTokenSilently } = useAuth0();
  const [apiInfo, setApiInfo] = useState({});
  const [token, setToken] = useState(null);


  getTokenSilently()
  .then(accessToken => {
    setToken(accessToken);
    setApiInfo({access_token: accessToken, expires_in: 84600})
  });

  const jsonApiInfo = JSON.stringify(apiInfo);

  return jsonApiInfo;

}

export default useApiCall;
