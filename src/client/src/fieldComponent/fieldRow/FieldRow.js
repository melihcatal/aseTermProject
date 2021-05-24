import React, { useEffect, useState } from "react";
import PositionItem from "../positionItem/PositionItem";
import "./FieldRowStyle.css";
function FieldRow(props) {
  const [positionItems, setPositionItems] = useState([]);
  console.log("props => " + JSON.stringify(props, null, 2));
  useEffect(() => {
    let tempArray = [];
    for (const [key, value] of Object.entries(props.positions[0])) {
      let score = parseInt(value);
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
