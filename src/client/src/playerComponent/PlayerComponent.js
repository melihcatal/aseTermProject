import PlayerCharts from "./playerCharts/PlayerCharts";
import PlayerInfoComponent from "./PlayerInfo/PlayerInfoComponent";
import "./PlayerComponentStyle.css";
import React, { Component } from "react";
import axios from "axios";
import FieldComponent from "../fieldComponent/FieldComponent";

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
      const playerID = this.props.match.params.id;
      const url = `http://localhost:3002/getPlayer/${playerID}`;
      //const url = `/getPlayer/${playerID}`;
      const results = await axios.get(url);
      const playerDataLength = Object.keys(results.data.playerData).length;
      if (playerDataLength > 0 && results.data.chartData.radarData.length > 0) {
        const resultDiv = (
          <div id="playerComponentDiv">
            <PlayerInfoComponent
              playerData={results.data.playerData}
              playerInfo={results.data.playerInfo}
            />
            <PlayerCharts chartInfo={results.data.chartData.radarData} />
            <PlayerCharts
              chartInfo={results.data.chartData.historicalData}
              id="lineChartDiv"
            />

            <FieldComponent data={results.data.positionInfo} />
          </div>
        );

        this.setState({
          results: resultDiv,
        });
      } else {
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
