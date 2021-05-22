import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./ComparePlayersTableStyle.css";

function ComparePlayersTable(props) {
  const [rows, setRows] = useState(null);
  useEffect(() => {
    let tempArray = [];
    props.homeTeam[0].players.map((currentPlayer, index) => {
      const row = (
        <tr id="tableRow">
          <td id="homeTableScore">{currentPlayer.overall}</td>
          <td id="homeTableName">
            <Link to={`/players/${currentPlayer._id}`}>
              {currentPlayer.short_name}
            </Link>
          </td>

          <td id="awayTableName">
            <Link to={`/players/${props.awayTeam[0].players[index]._id}`}>
              {" "}
              {props.awayTeam[0].players[index].short_name}
            </Link>
          </td>
          <td id="awayTableScore">
            {props.awayTeam[0].players[index].overall}
          </td>
        </tr>
      );
      tempArray.push(row);
    });
    setRows(tempArray);
  }, []);
  return (
    <div id="tableDiv">
      <table>{rows}</table>
    </div>
  );
}

export default ComparePlayersTable;
