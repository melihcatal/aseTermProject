import React from "react";

function SelectResultItem(props) {
  return (
    <div
      onClick={() => {
        props.itemSelected(
          props.club._id,
          props.club.clubLogo,
          props.club.clubName
        );
      }}
      id={"selectResultItemDiv"}
    >
      <div className="selectResultChildDiv" id="selectResultClub">
        <img src={props.club.clubLogo} />
        <h3>{props.club.clubName}</h3>
      </div>
      <div className="selectResultChildDiv" id="selectResultLeague">
        <img src={props.club.countryFlag} />
        <h4>{props.club.leagueName}</h4>
      </div>
    </div>
  );
}

export default SelectResultItem;
