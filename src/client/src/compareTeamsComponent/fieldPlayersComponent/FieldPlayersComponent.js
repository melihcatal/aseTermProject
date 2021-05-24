import React, { useEffect, useState } from "react";
import FieldRow from "../../fieldComponent/fieldRow/FieldRow";
import CompareFieldRow from "./CompareFieldRow";

function FieldPlayersComponent(props) {
  const [isWarning, setWarning] = useState(false);
  const [fieldRows, setFieldRows] = useState([]);

  useEffect(() => {
    try {
      let tempArray = [];
      props.data.map((currentRow) => {
        const currentItem = <CompareFieldRow positions={currentRow} />;
        tempArray.push(currentItem);
      });
      setFieldRows(tempArray);
    } catch (error) {
      console.log("error => " + error);
      setWarning(true);
    }
  }, []);

  return (
    <div id="fieldComponentDiv">{isWarning ? <h3>Error</h3> : fieldRows}</div>
  );
}

export default FieldPlayersComponent;
