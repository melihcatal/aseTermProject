import React from "react";
import "./PlayerInfoItemStyle.css";

function PlayerInfoItem(props) {
  const title = Object.keys(props.data)[0];
  const value = Object.values(props.data)[0];
  return (
    <div id="playerInfoDiv">
      <h3>{value}</h3>
      <h4>{title}</h4>
    </div>
  );
}

export default PlayerInfoItem;
