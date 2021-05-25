import React, { Component } from "react";
import axios from "axios";
import PlayerCharts from "../playerComponent/playerCharts/PlayerCharts";
import { Line } from "react-chartjs-2";
import CustomChart from "../chartComponent/CustomChart";
import FieldPlayersComponent from "../compareTeamsComponent/fieldPlayersComponent/FieldPlayersComponent";
import FieldComponent from "../fieldComponent/FieldComponent";
import ComparePlayerInfo from "./ComparePlayerInfo";
class ComparePlayerComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      results: null,
      isError: false,
    };
    this.getData = this.getData.bind(this);
  }

  async getData() {
    try {
      const result = await axios.get(
        `/comparePlayer?homePlayer=${this.props.location.state.homePlayerID}&awayPlayer=${this.props.location.state.awayPlayerID}`
      );
      console.log("result => " + JSON.stringify(result, null, 2));
      this.setState({
        results: result.data,
        isLoaded: true,
      });
    } catch (error) {
      this.setState({
        isError: true,
        isLoaded: true,
      });
    }
  }

  componentWillMount() {
    this.getData();
  }

  render() {
    return (
      <div>
        {this.state.isLoaded ? (
          <div>
            <div id="comparePlayerComponentInfoDiv">
              <ComparePlayerInfo data={this.state.results.playerInfo[0]} />
              <ComparePlayerInfo data={this.state.results.playerInfo[1]} />
            </div>
            <div id="compareTeamsFieldsDiv">
              <FieldComponent data={this.state.results.homePosition} />
              <FieldComponent data={this.state.results.awayPosition} />
            </div>
            <PlayerCharts
              chartInfo={this.state.results.historicalData}
              id="lineChartDiv"
            />
            <PlayerCharts chartInfo={this.state.results.radarData} />
          </div>
        ) : (
          <h3>Loading</h3>
        )}
      </div>
    );
  }
}

export default ComparePlayerComponent;
