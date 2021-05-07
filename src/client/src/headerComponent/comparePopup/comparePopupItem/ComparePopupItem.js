import React from "react";
import { Link } from "react-router-dom";
import "./ComparePopupItemStyle.css";

function ComparePopupItem(props) {
  return (
    <Link to={`/compare/${props.title}`} id="comparePopupItemDiv">
      <img src={props.imageSource} />
      <h3>{props.title}</h3>
    </Link>
  );
}

export default ComparePopupItem;
