import React, { useEffect, useState } from "react";
import PositionItem from "../positionItem/PositionItem";
import "./FieldRowStyle.css";
function FieldRow(props) {
  const [positionItems, setPositionItems] = useState([]);
  useEffect(() => {
    let tempArray = [];
    for (const [key, value] of Object.entries(props.positions[0])) {
      let score = parseInt(value);

      if (value.includes("+")) {
        let valueArray = value.split("+");
        score = parseInt(valueArray[0]) + parseInt(valueArray[1]);
      }
      const currentPosition = {
        position: key,
        score: score,
      };

      const currentPositionItem = <PositionItem info={currentPosition} />;
      tempArray.push(currentPositionItem);
    }
    setPositionItems(tempArray);
  }, []);
  return <div id="fieldRowDiv">{positionItems}</div>;
}

export default FieldRow;
