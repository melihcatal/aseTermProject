import React, { useEffect, useState } from "react";
import PlayerInfoItem from "./PlayerInfoItem/PlayerInfoItem";

function PlayerInfoComponent(props) {
  const [infoItems, setInfoItems] = useState([]);
  const [isWarning, setWarning] = useState(false);
  const warning = <h4>Error</h4>;
  useEffect(() => {
    try {
      if (props.data.length > 0) {
        let tempArray = [];
        props.data.map((currentData) => {
          const currentItem = <PlayerInfoItem data={currentData} />;
          tempArray.push(currentItem);
        });
        setInfoItems(tempArray);
      } else {
        throw "Error";
      }
    } catch (error) {
      setWarning(true);
    }
  }, []);
  return <div>{isWarning ? warning : infoItems}</div>;
}

export default PlayerInfoComponent;
