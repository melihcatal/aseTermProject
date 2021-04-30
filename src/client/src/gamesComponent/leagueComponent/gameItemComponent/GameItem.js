import React from "react";
import { Link } from "react-router-dom";

function GameItem(props) {
  return (
    <Link to={`/game/${props.gameInfo.gameID}`}>
      <h4 id="gameTimeInfo">{props.gameInfo.startTime}</h4>
      <h3 id="gameTeamsInfo">
        {props.gameInfo.homeTeam}-{props.gameInfo.awayTeam}
      </h3>
    </Link>
  );
}

export default GameItem;
