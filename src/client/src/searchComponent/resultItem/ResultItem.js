import React from "react";
import { Link } from "react-router-dom";

function ResultItem(props) {
  return (
    <Link to={`/players/${props.player.playerId}`}>
      <img src={props.player.imageSource} />
      <h3>{props.player.playerName}</h3>
    </Link>
  );
}

export default ResultItem;
