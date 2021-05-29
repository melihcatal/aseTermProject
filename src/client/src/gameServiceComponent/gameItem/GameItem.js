import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import "./GameItemStyle.css";
function GameItem(props) {
  return (
    <tr className="gameItemRow">
      <td
        style={{
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {props.data.gameStatus}
        <td
          style={{
            marginTop: "3%",
          }}
        >
          {props.data.gameDate.split("T")[0]}
        </td>
      </td>

      <td>
        <img src={props.data.homeTeam.logo} />
      </td>
      <td className={props.data.homeTeam.winner ? "winnerTeam" : undefined}>
        {props.data.homeTeam.name}
      </td>
      <td>{props.data.gameScore === null ? "-" : props.data.gameScore}</td>

      <td className={props.data.awayTeam.winner ? "winnerTeam" : undefined}>
        {props.data.awayTeam.name}
      </td>
      <td>
        <img src={props.data.awayTeam.logo} />
      </td>
      <td>
        <Link
          to={{
            pathname: "/compareTeams",
            search: `?homeTeam=${props.data.homeTeam.name}&awayTeam=${props.data.awayTeam.name}`,
            state: {
              homeLogo: props.data.homeTeam.logo,
              awayLogo: props.data.awayTeam.logo,
            },
          }}
        >
          <img src="../visuals/icons/compare.png" />
        </Link>
      </td>
    </tr>
  );
}

export default GameItem;
