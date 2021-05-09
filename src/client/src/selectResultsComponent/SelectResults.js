import React, { useEffect, useState } from "react";
import SelectResultItem from "./selectResultItem/SelectResultItem";
import "./SelectResultStyle.css";

function SelectResults(props) {
  const [warning, setWarning] = useState(null);
  const [resultItemsArray, setResultItems] = useState([]);

  useEffect(() => {
    let tempArray = [];
    try {
      if (props.results.length > 0) {
        setWarning(null);

        props.results.map((result) => {
          const currentItem = (
            <SelectResultItem
              key={result._id}
              club={result}
              itemSelected={props.itemSelected}
            />
          );
          tempArray.push(currentItem);
        });
        setResultItems(tempArray);
      } else {
        setWarning("Not Found");
      }
    } catch (error) {
      setWarning("Error");
    }
  }, [props.results]);

  return (
    <div id="selectResultsDiv">
      {warning ? <h3>{warning}</h3> : resultItemsArray}
    </div>
  );
}

export default SelectResults;
