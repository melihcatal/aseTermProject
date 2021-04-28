import React from "react";

function SearchBar(props) {
  const placeholder = "Search Player";
  return (
    <input
      type="text"
      onChange={(event) => {
        props.getPlayerData(event.target.value);
      }}
      placeholder={placeholder}
    />
  );
}

export default SearchBar;
