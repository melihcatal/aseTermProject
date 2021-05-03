import React, { useState, useEffect } from "react";
import CustomChart from "../../chartComponent/CustomChart";

function PlayerCharts(props) {
  const [chartItems, setChartItems] = useState([]);
  const [isWarning, setWarning] = useState(false);
  const warning = <h4>Error</h4>;
  useEffect(() => {
    try {
      if (props.chartInfo.length > 0) {
        let tempArray = [];
        props.chartInfo.map((chartInfo) => {
          const currentChart = <CustomChart chartInfo={chartInfo} />;
          tempArray.push(currentChart);
        });
        setChartItems(tempArray);
      } else {
        throw "Error";
      }
    } catch (error) {
      setWarning(true);
    }
  }, []);

  return <div>{isWarning ? warning : chartItems}</div>;
}

export default PlayerCharts;
