import React, { useEffect, useState } from "react";
import ResultItem from "../resultItem/ResultItem";

function Results(props) {
  const [warning, setWarning] = useState(null);
  const [resultItemsArray, setResultItems] = useState([]);

  useEffect(() => {
    let tempArray = [];
    try {
      if (props.results.length > 0) {
        setWarning(null);

        props.results.map((result) => {
          const currentItem = <ResultItem key={result._id} player={result} />;

          tempArray.push(currentItem);
        });
        setResultItems(tempArray);
      } else {
        throw "Not Found";
      }
    } catch (error) {
      setWarning(error);
    }
  }, [props.results]);

  // return <div>{warning ? <h3>{warning}</h3> : resultItemsArray}</div>;

  return (
    <div id={"HeaderSearchResultsDiv"}>
      {warning ? <h3>{warning}</h3> : resultItemsArray}
    </div>
  );
}

export default Results;
