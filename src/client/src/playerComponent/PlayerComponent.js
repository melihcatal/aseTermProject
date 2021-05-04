import PlayerCharts from "./playerCharts/PlayerCharts";
import PlayerInfoComponent from "./PlayerInfo/PlayerInfoComponent";
import React, { Component } from "react";
import axios from "axios";

class PlayerComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isWarning: false,
      results: null,
      isLoaded: false,
      warning: <h4 className="warning">Error</h4>,
    };

    this.getPlayerData = this.getPlayerData.bind(this);
  }

  async getPlayerData() {
    try {
      console.log("anan ");
      const playerID = this.props.match.params.id;
      const url = `http://localhost:3001/getPlayer/${playerID}`;
      const results = await axios.get(url);
      console.log("result => " + JSON.stringify(results, null, 2));
      const playerDataLength = Object.keys(results.data.playerData).length;
      console.log("length => " + playerDataLength);
      // if (playerDataLength > 0 && results.data.chartData.length > 0)
      if (playerDataLength > 0) {
        console.log("if");
        const resultDiv = (
          <div>
            <PlayerInfoComponent
              playerData={results.data.playerData}
              playerInfo={results.data.playerInfo}
            />
            {/* <PlayerCharts chartInfo={results.data.chartData} /> */}
          </div>
        );

        console.log("results div => " + resultDiv);
        this.setState({
          results: resultDiv,
        });
      } else {
        console.log("else");
        throw "Error";
      }
    } catch (error) {
      this.setState({
        warning: true,
      });
    }
  }

  componentWillMount() {
    this.getPlayerData();
  }

  render() {
    return this.state.isWarning ? this.state.warning : this.state.results;
  }
}
export default PlayerComponent;
