import React from "react";
import ChartComponent from "react-chartjs-2";

function CustomChart(props) {
  return (
    <div>
      <ChartComponent
        data={props.data}
        type={props.type}
        options={props.options}
      />
    </div>
  );
}

export default CustomChart;
