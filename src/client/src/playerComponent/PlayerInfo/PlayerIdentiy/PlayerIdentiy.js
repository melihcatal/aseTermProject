import React from "react";

function PlayerIdentiy(props) {
  return (
    <div>
      <img src={props.playerInfo.imageUrl} />
      <h3>{props.playerInfo.name}</h3>
      <h4>{props.playerInfo.nationality}</h4>
    </div>
  );
}

export default PlayerIdentiy;
