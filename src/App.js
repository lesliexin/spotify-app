import React from "react";
import { Route } from "react-router-dom";
import { Router } from "react-router-dom";
import Home from "./Home";
import Landing from "./Landing";
import history from "./history";

import "./App.css";

function App() {
  return (
    <Router history={history}>
      <div>
        <Route exact path="/" component={Landing} />
        <Route path="/home" component={Home} />
      </div>
    </Router>
  );
}

export default App;
