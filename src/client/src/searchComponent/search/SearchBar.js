import React from "react";

function SearchBar(props) {
  const placeholder = props.placeholder || "Search";
  return (
    <input
      type="text"
      onChange={(event) => {
        props.getData(event.target.value);
      }}
      placeholder={placeholder}
    />
  );
}

export default SearchBar;
