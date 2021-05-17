import React from "react";
import PositionItem from "../positionItem/PositionItem";
import "./FieldRowStyle.css";
function FieldRow(props) {
  return (
    <div id="fieldRowDiv">
      {props.positions.map((currentPositin) => (
        <PositionItem info={currentPositin} />
      ))}
    </div>
  );
}

export default FieldRow;
