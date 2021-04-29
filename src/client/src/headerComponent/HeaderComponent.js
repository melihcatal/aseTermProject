import React from "react";
import SearchComponent from "../searchComponent/SearchComponent";
import HeaderNavigation from "./headerNavigation/HeaderNavigation.js";
import "./HeaderComponentStyle.css";

function HeaderComponent(props) {
  return (
    <div id="headerDiv">
      <SearchComponent />
      <HeaderNavigation />
    </div>
  );
}

export default HeaderComponent;
