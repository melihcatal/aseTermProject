import React from "react";

function SelectResultItem(props) {
  return (
    <div
      onClick={() => {
        props.isTeam
          ? props.itemSelected(
              props.data._id,
              props.data.clubLogo,
              props.data.clubName
            )
          : props.itemSelected(
              props.data.playerID,
              props.data.imageUrl,
              props.data.name
            );
      }}
      id={"selectResultItemDiv"}
    >
      <div className="selectResultChildDiv" id="selectResultClub">
        <img src={props.data.clubLogo || props.data.imageUrl} />
        <h3>{props.data.clubName || props.data.name}</h3>
      </div>

      {props.isTeam && (
        <div className="selectResultChildDiv" id="selectResultLeague">
          <img src={props.data.countryFlag} />
          <h4>{props.data.leagueName}</h4>
        </div>
      )}
    </div>
  );
}

export default SelectResultItem;
