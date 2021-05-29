import React from "react";
import { Link } from "react-router-dom";
import "./ComparePopupItemStyle.css";

function ComparePopupItem(props) {
  const hrefLink = props.title == "Clubs" ? "/selectTeams" : "/selectPlayers";
  return (
    <a href={hrefLink} id="comparePopupItemDiv">
      <img src={props.imageSource} />
      <h3>{props.title}</h3>
    </a>
  );
}

export default ComparePopupItem;
