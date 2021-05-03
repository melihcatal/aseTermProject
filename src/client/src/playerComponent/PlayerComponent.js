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
      const playerID = this.props.match.params.id;
      const url = `/getPlayer/${playerID}`;
      const results = await axios.get(url);
      if (results.playerData.length > 0 && results.chartData.length > 0) {
        const resultDiv = (
          <div>
            <PlayerInfoComponent
              data={results.playerData}
              playerInfo={results.playerInfo}
            />
            <PlayerCharts chartInfo={results.chartData} />
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
