import React, { useEffect, useState } from "react";
import FieldRow from "./fieldRow/FieldRow";
import "./FieldComponentStyle.css";

function FieldComponent(props) {
  const [isWarning, setWarning] = useState(false);
  const [fieldRows, setFieldRows] = useState([]);

  useEffect(() => {
    try {
      let tempArray = [];
      props.data.map((currentRow) => {
        const currentItem = <FieldRow positions={currentRow} />;
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

export default FieldComponent;
