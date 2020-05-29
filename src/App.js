import React, { useEffect, useState } from "react";

import "./App.css";

//  Auth
const clientId = "7cd428b65bf84b8da214a85dd27ae32c"; // Have to replace it with your clientId
const redirectUri = "http://localhost:3000"; // Have to add this to your accepted Spotify redirect URIs on the Spotify API.
let accessToken;

const getAccessToken = () => {
  if (accessToken) {
    return accessToken;
  }

  const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
  const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);
  if (accessTokenMatch && expiresInMatch) {
    accessToken = accessTokenMatch[1];
    const expiresIn = Number(expiresInMatch[1]);
    window.setTimeout(() => (accessToken = ""), expiresIn * 1000);
    window.history.pushState("Access Token", null, "/"); // This clears the parameters, allowing us to get a new access token when it expires.
    return accessToken;
  } else {
    const accessUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectUri}`;
    window.location = accessUrl;
  }
};

function App() {
  const [profileInfo, setProfileInfo] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const accessToken = getAccessToken();
    const headers = { Authorization: `Bearer ${accessToken}` };

    fetch("https://api.spotify.com/v1/me", { headers: headers })
      .then(response => response.json())
      .then(jsonResponse => {
        setProfileInfo(jsonResponse);
        setIsLoading(false);
      })
      .catch(error => console.log(error));
  }, []);

  return (
    <div className="App">
      {isLoading && <p>Wait I'm Loading profile for you</p>}

      {profileInfo && <div>hello {profileInfo.display_name}</div>}
    </div>
  );
}

export default App;
