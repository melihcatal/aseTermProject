import React, { Component } from "react";

import axios from "axios";
import Leagues from "./leagues/Leagues";
import GameCalendar from "./gameCalendar/GameCalendar";
import "./GameServiceStyle.css";
import Loading from "../LoadingComponent/Loading";

class GameService extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fromDate: null,
      toDate: null,
      fixtures: null,
      isLoaded: false,
    };
    this.getFixtures = this.getFixtures.bind(this);
  }

  getFixtures(fromDate, toDate) {
    return new Promise(async (resolve, reject) => {
      try {
        this.setState({
          isLoaded: false,
        });
        // const url = `http://localhost:3005/getFixtures`;
        const url = "/getFixtures";
        const params = {
          fromDate: fromDate,
          toDate: toDate,
        };
        const result = await axios.get(url, { params: params });
        console.log("result => " + JSON.stringify(result.data, null, 2));

        if (result.data.length > 0) {
          let fixtures = [];
          result.data.map((currentFixture) => {
            const currentLeagueItem = <Leagues data={currentFixture} />;
            fixtures.push(currentLeagueItem);
          });

          this.setState({
            fixtures: fixtures,
            isLoaded: true,
          });
        } else {
          this.setState({
            fixtures: <h3>Not Found</h3>,
            isLoaded: true,
          });
        }

        resolve("done");
      } catch (error) {
        console.log("error");
        reject("error");
      }
    });
  }

  componentWillMount() {
    const fromDate = "2021-05-08";
    const toDate = "2021-05-08";
    this.getFixtures(fromDate, toDate);
  }
  render() {
    return (
      <div>
        <GameCalendar getFixtures={this.getFixtures} />
        {this.state.isLoaded ? this.state.fixtures : <Loading />}
      </div>
    );
  }
}

export default GameService;
