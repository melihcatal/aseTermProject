import React, { Component } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import PlayerCharts from "../playerComponent/playerCharts/PlayerCharts";

class CompareTeams extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      result: null,
      stackOptions: {
        indexAxis: "y",

        responsive: true,
      },
    };
    this.getData = this.getData.bind(this);
  }

  async getData() {
    const url =
      "http://localhost:3003/compareTeams?homeTeam=Antalyaspor&awayTeam=Liverpool";
    const result = await axios.get(url);
    this.setState({
      result: result.data,
      isLoaded: true,
    });
  }
  componentWillMount() {
    this.getData();
  }

  render() {
    return (
      <div>
        {this.state.isLoaded ? (
          <div>
            <PlayerCharts
              chartInfo={this.state.result.stackData}
              options={this.state.stackOptions}
            />
            <PlayerCharts chartInfo={this.state.result.radarData} />
          </div>
        ) : (
          <h3>Loading</h3>
        )}
      </div>
    );
  }
}

export default CompareTeams;
