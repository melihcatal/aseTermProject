import axios from "axios";
import React, { Component } from "react";

class SearchComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: "",
    };
  }

  async getPlayerData() {
    const searchText = this.state.searchText;
    console.log("sear => " + searchText);
    const url = `http://database:3000/searchPlayer/${searchText}`;
    const result = await axios.get(url);
  }
  render() {
    return (
      <div>
        <input
          type="text"
          defaultValue={this.state.searchText}
          onChange={(e) => {
            this.setState(
              {
                searchText: e.target.value,
              },
              () => {
                this.getPlayerData();
              }
            );
          }}
        />
      </div>
    );
  }
}

export default SearchComponent;
