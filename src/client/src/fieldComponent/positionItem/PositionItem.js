import React from "react";
import "./PositionItemStyle.css";

function PositionItem(props) {
  console.log(
    `rgb(235,${Math.floor(
      props.info.score * process.env.REACT_APP_FIELD_BACK_COEF
    )},52)`
  );
  return (
    <div
      style={{
        backgroundColor: `rgb(235,${Math.floor(
          props.info.score * process.env.REACT_APP_FIELD_BACK_COEF
        )},52)`,
        zIndex: 4,
      }}
      id={"positionItemDiv"}
    >
      <h4>{props.info.position}</h4>
      <h3>{props.info.score}</h3>
    </div>
  );
}

export default PositionItem;
