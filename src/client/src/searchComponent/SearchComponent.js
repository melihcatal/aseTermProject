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
    const url = `http://database:3000/searchPlayer/${searchText}`;
    const results = await axios.get(url);
    this.setState({
      results: results,
    });
  }

  render() {
    return (
      <div>
        <SearchBar getPlayerData={this.getPlayerData} />
        {this.state.results && <Results results={this.state.results} />}
      </div>
    );
  }
}

export default SearchComponent;
