import React, { useEffect, useState } from "react";
import CompareFieldItem from "./CompareFieldItem";

function CompareFieldRow(props) {
  const [positionItems, setPositionItems] = useState([]);

  useEffect(() => {
    let tempArray = [];
    props.positions.map((currentData) => {
      const currentPosition = {
        position: currentData._id,
        score: currentData.bestOverall,
        playerName: currentData.bestPlayer.short_name,
        playerID: currentData.bestPlayer._id,
        playerImage: currentData.bestPlayer.imageUrl,
      };

      const currentPositionItem = <CompareFieldItem info={currentPosition} />;
      tempArray.push(currentPositionItem);
    });

    setPositionItems(tempArray);
    // console.log(
    //   "row item => " + JSON.stringify(props.positions.length, null, 2)
    // );
  }, []);
  return <div id="fieldRowDiv">{positionItems}</div>;
}

export default CompareFieldRow;
