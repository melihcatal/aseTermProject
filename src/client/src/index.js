import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Router, Switch } from "react-router-dom";
import ComparePopup from "./ comparePopup/ComparePopup";
import App from "./App";
import ComparePlayerComponent from "./comparePlayerComponent/ComparePlayerComponent";
import CompareTeams from "./compareTeamsComponent/CompareTeams";
import FieldComponent from "./fieldComponent/FieldComponent";
import GameService from "./gameServiceComponent/GameService";
import HeaderComponent from "./headerComponent/HeaderComponent";
import history from "./history";
import NotFoundComponent from "./NotFoundComponent/NotFoundComponent";
import PlayerComponent from "./playerComponent/PlayerComponent";
import SelectPlayerComponent from "./selectPlayerComponent/SelectPlayerComponent";
import SelectTeamComponent from "./selectTeamComponent/SelectTeamComponent";

ReactDOM.render(
  <BrowserRouter history={history}>
    <HeaderComponent />
    <Switch>
      <Route path="/" exact component={GameService}></Route>
      <Route path="/players/:id" exact component={PlayerComponent}></Route>
      <Route path="/selectTeams" exact component={SelectTeamComponent}></Route>
      <Route path="/compareTeams" exact component={CompareTeams}></Route>
      <Route
        path="/comparePlayers"
        exact
        component={ComparePlayerComponent}
      ></Route>

      <Route
        path="/selectPlayers"
        exact
        component={SelectPlayerComponent}
      ></Route>
      <Route path="*" exact={true} component={NotFoundComponent} />
    </Switch>
  </BrowserRouter>,
  document.getElementById("root")
);
