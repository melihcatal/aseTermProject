import React from "react";
import { Link } from "react-router-dom";

function ResultItem(props) {
  return (
    <div>
      <Link to={`/players/${props.player._id}`}>
        <img src={props.player.imageUrl} />

        <h3>{props.player.name}</h3>
        <h4>{props.player.overall}</h4>
        <h5>{props.player.year}</h5>
      </Link>
    </div>
  );
}

export default ResultItem;
