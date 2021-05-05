import { mount } from "enzyme";
import CustomChart from "./CustomChart";
jest.mock("react-chartjs-2", () => ({
  Bar: () => null, // add any additional chart types here
  Line: () => null,
  Radar: () => null,
}));
const data = {
  labels: [
    "Eating",
    "Drinking",
    "Sleeping",
    "Designing",
    "Coding",
    "Cycling",
    "Running",
  ],
  datasets: [
    {
      label: "My First Dataset",
      data: [65, 59, 90, 81, 56, 55, 40],
      fill: true,
      backgroundColor: "rgba(255, 99, 132, 0.2)",
      borderColor: "rgb(255, 99, 132)",
      pointBackgroundColor: "rgb(255, 99, 132)",
      pointBorderColor: "#fff",
      pointHoverBackgroundColor: "#fff",
      pointHoverBorderColor: "rgb(255, 99, 132)",
    },
    {
      label: "My Second Dataset",
      data: [28, 48, 40, 19, 96, 27, 100],
      fill: true,
      backgroundColor: "rgba(54, 162, 235, 0.2)",
      borderColor: "rgb(54, 162, 235)",
      pointBackgroundColor: "rgb(54, 162, 235)",
      pointBorderColor: "#fff",
      pointHoverBackgroundColor: "#fff",
      pointHoverBorderColor: "rgb(54, 162, 235)",
    },
  ],
};
describe("Custom Chart Testing", () => {
  it("Should render desired chart", () => {
    const chartInfo = {
      data: data,
      type: "radar",
    };
    const wrapper = mount(<CustomChart chartInfo={chartInfo} />);

    const radarChart = wrapper.find("Radar");
    const lineChart = wrapper.find("Line");
    expect(radarChart.length).toBe(1);
    expect(lineChart.length).toBe(0);
  });
});
