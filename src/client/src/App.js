import React, { Component } from "react";
import CustomChart from "./chartComponent/CustomChart";
import HeaderComponent from "./headerComponent/HeaderComponent";
import SearchComponent from "./searchComponent/SearchComponent";

class App extends Component {
  render() {
    return (
      <div>
        <HeaderComponent />
      </div>
    );
  }
}

export default App;
