import React, { useState, useEffect } from "react";
import CustomChart from "../../chartComponent/CustomChart";
import "./PlayerChartsStyle.css";

function PlayerCharts(props) {
  const [chartItems, setChartItems] = useState([]);
  const [isWarning, setWarning] = useState(false);
  const warning = <h4>Error</h4>;
  useEffect(() => {
    try {
      if (props.chartInfo.length > 0) {
        let tempArray = [];
        props.chartInfo.map((chartInfo) => {
          const currentChart = (
            <CustomChart
              id={props.id ? "lineChart" : null}
              chartInfo={chartInfo}
              options={props.options || null}
            />
          );
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

  return (
    <div className="playerChartsDiv" id={props.id || "playerChartsDiv"}>
      {isWarning ? warning : chartItems}
    </div>
  );
}

export default PlayerCharts;
