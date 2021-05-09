import React from "react";
import "./TeamItemStyle.css";

function TeamItem(props) {
  const teamImageSource = "../visuals/icons/football-club.png";
  const playerImageSource = "../visuals/icons/tshirt.png";
  const image = props.isTeam ? (
    <img src={!props.isSelected ? teamImageSource : props.imageSource} />
  ) : (
    <img src={!props.isSelected ? playerImageSource : props.imageSource} />
  );

  return (
    <div
      onClick={() => {
        props.setClicked(true);
        props.setTurn(props.turn);
      }}
      id={"compareSelectItem"}
    >
      {image}
      {props.isSelected && <h4>{props.name}</h4>}
    </div>
  );
}

export default TeamItem;
