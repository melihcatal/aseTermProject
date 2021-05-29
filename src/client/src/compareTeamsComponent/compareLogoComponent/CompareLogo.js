import React from "react";
import "./CompareLogoStyle.css";

function CompareLogo(props) {
  return (
    <div id="CompareLogoDiv">
      <div>
        <img src={props.homeLogo} />
        <h4>{props.homeName}</h4>
      </div>

      <div>
        <img src={props.awayLogo} />
        <h4>{props.awayName}</h4>
      </div>
    </div>
  );
}

export default CompareLogo;
