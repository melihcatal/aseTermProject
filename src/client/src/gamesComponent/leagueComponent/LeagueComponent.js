import React, { useEffect, useState } from "react";
import GameItem from "./gameItemComponent/GameItem";

function LeagueComponent(props) {
  const [games, setGames] = useState([]);
  const [isWarning, setWarning] = useState(false);
  const warning = <h3>Not Found</h3>;
  useEffect(() => {
    if (props.leagueInfo.games.length > 0) {
      let tempArray = [];
      props.leagueInfo.games.map((currentGame) => {
        const currentItem = <GameItem gameInfo={currentGame} />;
        tempArray.push(currentItem);
      });
      setGames(tempArray);
    } else {
      setWarning(true);
    }
  }, []);
  return (
    <div>
      <h4 id="leagueName">{props.leagueInfo.leagueName}</h4>
      {isWarning ? warning : games}
    </div>
  );
}

export default LeagueComponent;
