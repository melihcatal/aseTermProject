import React from "react";
import "./HeaderNavigationStyle.css";

function HeaderNavigation(props) {
  return (
    <div
      id="headerNavigation"
      onClick={
        props.isPopup
          ? () => {
              console.log("open popup");
            }
          : undefined
      }
    >
      <img src={props.imageSource} />
      <h5>{props.title}</h5>
    </div>
  );
}

export default HeaderNavigation;
