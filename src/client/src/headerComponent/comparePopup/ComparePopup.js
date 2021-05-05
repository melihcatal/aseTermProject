import React from "react";
import ComparePopupItem from "./comparePopupItem/ComparePopupItem";
import "./ComparePopupStyle.css";

function ComparePopup(props) {
  return (
    <div id="comparePopupDiv">
      <ComparePopupItem
        imageSource="../visuals/icons/football-club.png"
        title="Clubs"
      />
      <ComparePopupItem
        imageSource="../visuals/icons/tshirt.png"
        title="Players"
      />
    </div>
  );
}

export default ComparePopup;
