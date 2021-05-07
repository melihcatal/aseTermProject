import React from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";

function ResultItem(props) {
  const history = useHistory();

  return (
    <div id={"headerSearchResultItemDiv"}>
      <a href={`/players/${props.player.playerID}`}>
        <img src={props.player.imageUrl} />
        <h3>{props.player.name}</h3>
        <h4>{props.player.overall}</h4>
      </a>
    </div>
  );
}

export default ResultItem;
