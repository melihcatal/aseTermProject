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
    <div>
      <Chart data={props.chartInfo.data} />
    </div>
  );
}

export default CustomChart;
