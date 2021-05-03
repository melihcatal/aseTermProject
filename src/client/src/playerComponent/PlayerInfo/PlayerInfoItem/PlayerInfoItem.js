import React from "react";

function PlayerInfoItem(props) {
  return (
    <div id="playerInfoDiv">
      <h3>{props.data.value}</h3>
      <h4>{props.data.title}</h4>
    </div>
  );
}

export default PlayerInfoItem;
