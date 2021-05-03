import React, { useEffect, useState } from "react";
import PlayerIdentiy from "./PlayerIdentiy/PlayerIdentiy";
import PlayerInfoItem from "./PlayerInfoItem/PlayerInfoItem";

function PlayerInfoComponent(props) {
  const [infoItems, setInfoItems] = useState(null);
  const [isWarning, setWarning] = useState(false);
  const warning = <h4 className="warning">Error</h4>;
  useEffect(() => {
    try {
      if (props.data.length > 0 && props.playerInfo != undefined) {
        let tempArray = [];
        props.data.map((currentData) => {
          const currentItem = <PlayerInfoItem data={currentData} />;
          tempArray.push(currentItem);
        });
        const infoItems = (
          <div>
            <PlayerIdentiy playerInfo={props.playerInfo} />
            {tempArray}
          </div>
        );
        setInfoItems(infoItems);
      } else {
        throw "Error";
      }
    } catch (error) {
      setWarning(true);
    }
  }, []);
  return isWarning ? warning : infoItems;
}

export default PlayerInfoComponent;
