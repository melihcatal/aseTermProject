import React, { useEffect, useState } from "react";
import PlayerIdentiy from "./PlayerIdentiy/PlayerIdentiy";
import PlayerInfoItem from "./PlayerInfoItem/PlayerInfoItem";
import "./PlayerInfoComponentStyle.css";

function PlayerInfoComponent(props) {
  const [infoItems, setInfoItems] = useState(null);
  const [isWarning, setWarning] = useState(false);
  const warning = <h4 className="warning">Error</h4>;
  useEffect(() => {
    try {
      const playerDataLength = Object.keys(props.playerData).length;

      if (playerDataLength > 0 && props.playerInfo != undefined) {
        let tempArray = [];
        // props.data.map((currentData) => {
        //   const currentItem = <PlayerInfoItem data={currentData} />;
        //   tempArray.push(currentItem);
        // });

        for (const [key, value] of Object.entries(props.playerData)) {
          let currentData = {};
          currentData[key] = value;
          const currentItem = <PlayerInfoItem data={currentData} />;
          tempArray.push(currentItem);
        }

        const infoItems = (
          <div id="playerInfo">
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
