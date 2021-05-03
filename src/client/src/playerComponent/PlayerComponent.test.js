import { mount, shallow } from "enzyme";
import PlayerComponent from "./PlayerComponent";
import PlayerInfoComponent from "./PlayerInfo/PlayerInfoComponent";
import PlayerCharts from "./playerCharts/PlayerCharts";
const imageUrl =
  "https://asefifaplayers.s3.eu-central-1.amazonaws.com/players21/notfound.png";
const name = "Ronaldo";
const nationality = "Portugal";
const axios = require("axios");
jest.mock("axios");
const playerInfo = {
  imageUrl: imageUrl,
  name: name,
  nationality: nationality,
};

const title = "Rating";
const value = "92";
const data = {
  title: title,
  value: value,
};
const playerData = [data, data, data, data, data];

const chartData = {
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

const chartInfo = {
  data: chartData,
  type: "radar",
};

const chartResponse = [chartInfo, chartInfo, chartInfo, chartInfo];

const response = {
  chartData: chartResponse,
  playerInfo: playerInfo,
  playerData: playerData,
};
jest.mock("react-chartjs-2", () => ({
  Bar: () => null, // add any additional chart types here
  Line: () => null,
  Radar: () => null,
}));

describe("Player Component Test", () => {
  it("deneme knk", async () => {
    const wrapper = mount(
      <PlayerComponent
        match={{ params: { id: 1 }, isExact: true, path: "", url: "" }}
      />
    );
    const resultDiv = (
      <div>
        <PlayerInfoComponent
          data={response.playerData}
          playerInfo={response.playerInfo}
        />
        <PlayerCharts chartInfo={response.chartData} />
      </div>
    );
    expect(wrapper.state("results")).toBeNull;
    axios.get.mockResolvedValue(response);
    await wrapper.instance().getPlayerData();
    expect(wrapper.state("results")).toStrictEqual(resultDiv);

    expect(axios.get).toHaveBeenCalledWith(`/getPlayer/1`);

    wrapper.update();

    const infoItems = wrapper.find("PlayerInfoComponent");
    const identiyInfo = wrapper.find("PlayerCharts");
    expect(infoItems.length).toEqual(1);
    expect(identiyInfo.length).toEqual(1);
  });
});
