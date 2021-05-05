import React, { useState } from "react";
import "./HeaderNavigationStyle.css";
import HeaderNavigationItem from "./headerNavigationItem/HeaderNavigationItem";
import ComparePopup from "../comparePopup/ComparePopup";

function HeaderNavigation(props) {
  const [isClicked, setClicked] = useState(false);
  return (
    <div id="headerNavigation">
      <HeaderNavigationItem
        isPopup={false}
        imageSource="../visuals/icons/ball.png"
        title="Games"
      />
      <HeaderNavigationItem
        isPopup={true}
        imageSource="../visuals/icons/compare.png"
        title="Compare"
        isClicked={isClicked}
        setClicked={setClicked}
      />

      {isClicked && <ComparePopup />}
    </div>
  );
}

export default HeaderNavigation;
