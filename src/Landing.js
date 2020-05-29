import React from "react";
import { useHistory } from "react-router-dom";
import "./App.css";

function App() {
  const history = useHistory();
  return (
    <div
      onClick={() => {
        history.push("/home");
      }}
    >
      Login with Spotify
    </div>
  );
}

export default App;
