import React, { useEffect, useState } from "react";
import GameItem from "../gameItem/GameItem";
import LeagueInfo from "./LeagueInfo";

function Leagues(props) {
  const [gameItems, setGameItems] = useState(null);
  useEffect(() => {
    if (props.data.games.length > 0) {
      let tempArray = [];
      props.data.games.map((currentGame) => {
        const gameItem = <GameItem data={currentGame} />;
        tempArray.push(gameItem);
      });
      setGameItems(tempArray);
    } else {
      setGameItems(
        <tr>
          <td></td>
          <td></td>
          <td></td>
          <td>No Game</td>

          <td></td>
          <td></td>
          <td></td>
        </tr>
      );
    }
  }, [props.data]);
  return (
    <div id="leaguesDiv">
      <table id="gamesTable">
        <LeagueInfo data={props.data.leagueInfo} />

        {gameItems}
      </table>
    </div>
  );
}

export default Leagues;
