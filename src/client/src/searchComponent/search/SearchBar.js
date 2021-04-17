import React from "react";

function SearchBar(props) {
  return (
    <div>
      <input
        type="text"
        onChange={(event) => {
          props.getPlayerData(event.target.value);
        }}
      />
    </div>
  );
}

export default SearchBar;
