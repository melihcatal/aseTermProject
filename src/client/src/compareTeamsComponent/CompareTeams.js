import React, { Component } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import PlayerCharts from "../playerComponent/playerCharts/PlayerCharts";
import queryString from "query-string";
import CompareLogo from "./compareLogoComponent/CompareLogo";
import FieldPlayersComponent from "./fieldPlayersComponent/FieldPlayersComponent";
import ComparePlayersTable from "./compareTeamsPlayers/ComparePlayersTable";
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
    try {
      const url = `http://localhost:3003/compareTeams/${this.props.location.search}`;
      //const url = `/compareTeams/${this.props.location.search}`;

      const result = await axios.get(url);

      const search = queryString.parse(this.props.location.search);

      this.setState({
        result: result.data,
        isLoaded: true,
        isError: false,
        homeName: search.homeTeam,
        awayName: search.awayTeam,
        homeLogo: this.props.location.state.homeLogo,
        awayLogo: this.props.location.state.awayLogo,
      });
    } catch (error) {
      this.setState({
        isLoaded: true,
        isError: true,
      });
    }
  }
  componentWillMount() {
    console.log("props => " + JSON.stringify(this.props, null, 2));
    this.getData();
  }

  render() {
    return (
      <div>
        {this.state.isLoaded ? (
          this.state.isError ? (
            <h3>Error</h3>
          ) : (
            <div>
              <CompareLogo
                homeLogo={this.state.homeLogo}
                homeName={this.state.homeName}
                awayLogo={this.state.awayLogo}
                awayName={this.state.awayName}
              />
              <ComparePlayersTable
                homeTeam={this.state.result.homeTeamPlayers}
                awayTeam={this.state.result.awayTeamPlayers}
              />

              <div id="compareTeamsFieldsDiv">
                <FieldPlayersComponent
                  data={this.state.result.homeTeamPlayerData}
                />
                <FieldPlayersComponent
                  data={this.state.result.awayTeamPlayerData}
                />
              </div>

              <PlayerCharts
                chartInfo={this.state.result.stackData}
                options={this.state.stackOptions}
                id="lineChartDiv"
              />
              <PlayerCharts chartInfo={this.state.result.radarData} />
            </div>
          )
        ) : (
          <h3>Loading</h3>
        )}
      </div>
    );
  }
}

export default CompareTeams;
