import React from "react";
import "./LoadingStyle.css";

function Loading(props) {
  return (
    <div className={"centerFlex"}>
      <div className="row">
        <h4 className="flex-item">{props.loadingTitle}</h4>

        <img className="flex-item" src={"../visuals/loading.gif"} />
      </div>
    </div>
  );
}

export default Loading;
