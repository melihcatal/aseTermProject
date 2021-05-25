import React from "react";

function ComparePlayerInfoItem(props) {
  return (
    <div id="comparePlayerInfoItemDiv">
      <h3>{props.data}</h3>
      <h4>{props.title}</h4>
    </div>
  );
}

export default ComparePlayerInfoItem;
