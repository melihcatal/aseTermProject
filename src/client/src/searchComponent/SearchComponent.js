import axios from "axios";
import React, { Component } from "react";
import Results from "./results/Results";
import SearchBar from "./search/SearchBar";

class SearchComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      results: null,
    };
    this.getPlayerData = this.getPlayerData.bind(this);
  }

  async getPlayerData(searchText) {
    try {
      if (searchText != "") {
        // const url = `http://${process.env.DATABASE_URL}/searchPlayer/${searchText}`;
        const url = `/searchPlayer/${searchText}`;
        const results = await axios.get(url);
        this.setState({
          results: results.data,
        });
      } else {
        this.setState({
          results: null,
        });
      }
    } catch (error) {
      const statusCode = error.response.status;
      if (statusCode == 404) {
        this.setState({
          results: [],
        });
      } else {
        this.setState({
          results: null,
        });
        alert("Server Error");
      }
    }
  }

  render() {
    return (
      <div>
        <SearchBar getPlayerData={this.getPlayerData} />
        {this.state.results != null && <Results results={this.state.results} />}
      </div>
    );
  }
}

export default SearchComponent;
