import React from "react";
import "./TeamItemStyle.css";

function TeamItem(props) {
  const imageSource = "../visuals/icons/football-club.png";
  return (
    <div
      onClick={() => {
        props.setClicked(true);
        props.setTurn(props.turn);
      }}
      id={"compareSelectItem"}
    >
      <img src={!props.isSelected ? imageSource : props.imageSource} />
      {props.isSelected && <h4>{props.name}</h4>}
    </div>
  );
}

export default TeamItem;
