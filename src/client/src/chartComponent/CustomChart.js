import React from "react";
import { Radar, Line, Bar, Pie, Bubble, Scatter } from "react-chartjs-2";

const components = {
  radar: Radar,
  line: Line,
  bar: Bar,
  pie: Pie,
  bubble: Bubble,
  scatter: Scatter,
};
function CustomChart(props) {
  const Chart = components[props.chartInfo.type];

  return (
    <div className="customChartDiv" id={props.id || "customChartDiv"}>
      <Chart data={props.chartInfo.data} options={props.options || {}} />
    </div>
  );
}

export default CustomChart;
