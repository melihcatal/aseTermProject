import React from "react";
import "./PositionItemStyle.css";

function PositionItem(props) {
  //console.log("poisiton item => " + JSON.stringify(props, null, 2));
  return (
    <div
      style={{
        backgroundColor: `rgb(235,${Math.floor(
          props.info.score * process.env.REACT_APP_FIELD_BACK_COEF
        )},52)`,
        zIndex: 4,
      }}
      className={"positionItemDiv"}
    >
      <h4>{props.info.position}</h4>
      <h3>{props.info.score}</h3>
    </div>
  );
}

export default PositionItem;
