import React from "react";
import SearchComponent from "../searchComponent/SearchComponent";
import HeaderNavigation from "./headerNavigation/HeaderNavigation";
import "./HeaderComponentStyle.css";
function HeaderComponent(props) {
  return (
    <div id="headerDiv">
      <SearchComponent />
      <HeaderNavigation
        isPopup={false}
        imageSource="./visuals/icons/ball.png"
        title="Games"
      />
      <HeaderNavigation
        isPopup={true}
        imageSource="./visuals/icons/compare.png"
        title="Compare"
      />
    </div>
  );
}

export default HeaderComponent;
