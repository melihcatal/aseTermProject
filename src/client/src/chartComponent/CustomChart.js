import React from "react";
import ChartComponent, { Radar } from "react-chartjs-2";

function CustomChart(props) {
  return (
    <div>
      <ChartComponent data={props.data} type={props.type} />
      {/* <Radar data={props.data} /> */}
    </div>
  );
}

export default CustomChart;
