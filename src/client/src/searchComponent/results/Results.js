import React, { useEffect, useState } from "react";
import ResultItem from "../resultItem/ResultItem";
var Validator = require("jsonschema").Validator;

function Results(props) {
  const [warning, setWarning] = useState(null);
  const [resultItemsArray, setResultItems] = useState([]);
  const schema = {
    id: "/result",
    type: "object",
    properties: {
      playerId: { type: "number" },
      playerName: { type: "string" },
      imageSource: { type: "string" },
    },
  };

  const validator = new Validator();

  useEffect(() => {
    let tempArray = [];
    try {
      if (props.results.length > 0) {
        setWarning(null);

        props.results.map((result) => {
          const isValid = validator.validate(result, schema).valid;
          if (!isValid) {
            throw "Error";
          }

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

  return <div>{warning ? <h3>{warning}</h3> : resultItemsArray}</div>;
}

export default Results;
