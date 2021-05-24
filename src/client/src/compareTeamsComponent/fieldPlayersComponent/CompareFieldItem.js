import React from "react";
import { Link } from "react-router-dom";

function CompareFieldItem(props) {
  return (
    <Link
      id="compareFieldItemDiv"
      className={"positionItemDiv"}
      to={`/players/${props.info.playerID}`}
    >
      <img src={props.info.playerImage} />
      <div>
        <h4>{props.info.playerName}</h4>
        <h3>{props.info.score}</h3>
      </div>
    </Link>
  );
}

export default CompareFieldItem;
