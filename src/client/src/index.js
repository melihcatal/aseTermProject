import React from "react";
import ReactDOM from "react-dom";
import { Route, Router, Switch } from "react-router-dom";
import App from "./App";
import history from "./history";

ReactDOM.render(
  <Router history={history}>
    <Switch>
      <Route path="/" exact component={App}></Route>
    </Switch>
  </Router>,
  document.getElementById("root")
);
