import React from "react";
import ReactDOM from "react-dom";
import { Route, Router, Switch } from "react-router-dom";
import App from "./App";
import history from "./history";
import PlayerComponent from "./playerComponent/PlayerComponent";

ReactDOM.render(
  <Router history={history}>
    <Switch>
      <Route path="/" exact component={App}></Route>
      <Route path="/players/:id" exact component={PlayerComponent}></Route>
    </Switch>
  </Router>,
  document.getElementById("root")
);
