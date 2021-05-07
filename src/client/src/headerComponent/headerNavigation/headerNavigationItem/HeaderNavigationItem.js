import React from "react";
import "./HeaderNavigationItemStyle.css";

function HeaderNavigationItem(props) {
  return (
    <div
      id="headerNavigationItem"
      onClick={
        props.isPopup
          ? () => {
              props.setClicked(!props.isClicked);
            }
          : undefined
      }
    >
      <img src={props.imageSource} />
      <h5>{props.title}</h5>
    </div>
  );
}

export default HeaderNavigationItem;
