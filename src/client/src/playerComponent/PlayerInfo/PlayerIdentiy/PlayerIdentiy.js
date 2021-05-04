import React from "react";

function PlayerIdentiy(props) {
  return (
    <div id="playerIdentityDiv">
      <img src={props.playerInfo.imageUrl} />
      <div>
        <h3>{props.playerInfo.name}</h3>
        <h4>{props.playerInfo.nationality}</h4>
      </div>
    </div>
  );
}

export default PlayerIdentiy;
