import React from "react";
import ReactDOM from "react-dom";
import { Route, Router, Switch } from "react-router-dom";
import App from "./App";
import LeagueComponent from "./gamesComponent/leagueComponent/LeagueComponent";
import history from "./history";

ReactDOM.render(
  <Router history={history}>
    <Switch>
      <Route path="/" exact component={App}></Route>
      <Route path="/anan" exact component={LeagueComponent}></Route>
    </Switch>
  </Router>,
  document.getElementById("root")
);
