import React from "react";

function PlayerIdentiy(props) {
  return (
    <div id="playerIdentityDiv">
      <img src={props.playerInfo.imageUrl} />
      <div>
        <h3>{props.playerInfo.name}</h3>
        <img
          title={props.playerInfo.nationality}
          id={"playerIdentityCountry"}
          src={`https://asefifaplayers.s3.eu-central-1.amazonaws.com/countryFlags/${props.playerInfo.nationality}.png`}
        />
      </div>
    </div>
  );
}

export default PlayerIdentiy;
