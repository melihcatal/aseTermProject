import React from "react";

function LeagueInfo(props) {
  return (
    <tr id="LeagueInfoDiv">
      <td></td>
      <td>
        <img src={props.data.logo} />
      </td>
      <td>
        <h3>{props.data.name}</h3>
      </td>
      <td></td>

      <td>
        <h3>{props.data.country}</h3>
      </td>
      <td>
        <img src={props.data.flag} />
      </td>
      <td></td>
    </tr>
  );
}

export default LeagueInfo;
