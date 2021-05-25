import React from "react";
import { Link } from "react-router-dom";
import ComparePlayerInfoItem from "./ComparePlayerInfoItem";
import "./ComparePlayerInfoStyle.css";
function ComparePlayerInfo(props) {
  return (
    <div
      id="comparePlayerInfoDiv"
      style={{
        backgroundColor: props.data.backgroundColor,
      }}
    >
      <Link to={`/players/${props.data._id}`}>
        <img id="comparePlayerImage" src={props.data.playerImage} />
      </Link>
      <div id="comparePlayerLeagueDiv">
        <img id="comparePlayerClubLogo" src={props.data.clubLogo} />
        <img id="comparePlayerCountryFlag" src={props.data.countryFlag} />
      </div>
      <ComparePlayerInfoItem data={props.data.short_name} title="Name" />
      <ComparePlayerInfoItem data={props.data.club} title="Club" />
      <ComparePlayerInfoItem data={props.data.overall} title="Overall" />

      <ComparePlayerInfoItem data={props.data.height_cm} title="Height" />
      <ComparePlayerInfoItem data={props.data.weight_kg} title="Weight" />
      <ComparePlayerInfoItem data={props.data.age} title="Age" />
      <ComparePlayerInfoItem
        data={props.data.player_positions}
        title="Positions"
      />
    </div>
  );
}

export default ComparePlayerInfo;
