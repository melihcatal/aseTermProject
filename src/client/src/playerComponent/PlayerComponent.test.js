import { mount, shallow } from "enzyme";
import PlayerComponent from "./PlayerComponent";
import PlayerInfoComponent from "./PlayerInfo/PlayerInfoComponent";
import PlayerCharts from "./playerCharts/PlayerCharts";
import FieldComponent from "../fieldComponent/FieldComponent";
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

const response = {
  playerData: {
    age: "22",
    club: "Trabzonspor",
    overall: "70",
    value: "2100000",
    position: "CB",
    preferredFoot: "Right",
    workRate: "Medium/High",
    bodyType: "Normal",
  },
  playerInfo: {
    name: "Hüseyin Türkmen",
    nationality: "Turkey",
    imageUrl:
      "https://asefifaplayers.s3.eu-central-1.amazonaws.com/players21/243244.png",
  },
  chartData: {
    radarData: [
      {
        data: {
          labels: [
            "Pace",
            "Shooting",
            "Passing",
            "Dribbling",
            "Defending",
            "Physic",
          ],
          datasets: [
            {
              label: "General",
              data: ["73.0", "37.0", "50.0", "57.0", "72.0", "70.0"],
              backgroundColor: "rgba(63,36,221,0.5)",
            },
          ],
        },
        type: "radar",
      },
      {
        data: {
          labels: [
            "Crossing",
            "Finishing",
            "Heading",
            "Short Passing",
            "Volleys",
          ],
          datasets: [
            {
              label: "Attacking",
              data: ["48", "25", "73", "56", "40"],
              backgroundColor: "rgba(52,151,236,0.5)",
            },
          ],
        },
        type: "radar",
      },
      {
        data: {
          labels: [
            "Dribbling",
            "Curve",
            "FK Accuracy",
            "Long Passing",
            "Ball Control",
          ],
          datasets: [
            {
              label: "Skill",
              data: ["53", "52", "36", "53", "58"],
              backgroundColor: "rgba(252,176,182,0.5)",
            },
          ],
        },
        type: "radar",
      },
      {
        data: {
          labels: ["Acceleration", "Sprint", "Agility", "Reactions", "Balance"],
          datasets: [
            {
              label: "Movement",
              data: ["72", "73", "61", "66", "68"],
              backgroundColor: "rgba(11,104,11,0.5)",
            },
          ],
        },
        type: "radar",
      },
      {
        data: {
          labels: [
            "Shot Power",
            "Jumping",
            "Stamina",
            "Strength",
            "Long Shots",
          ],
          datasets: [
            {
              label: "Power",
              data: ["60", "83", "68", "74", "45"],
              backgroundColor: "rgba(236,56,247,0.5)",
            },
          ],
        },
        type: "radar",
      },
      {
        data: {
          labels: [
            "Aggression",
            "Interceptions",
            "Positioning",
            "Vision",
            "Penalties",
          ],
          datasets: [
            {
              label: "Mentality",
              data: ["61", "73", "25", "40", "32"],
              backgroundColor: "rgba(15,162,128,0.5)",
            },
          ],
        },
        type: "radar",
      },
      {
        data: {
          labels: ["Marking", "Standing Tackle", "Sliding Tackle"],
          datasets: [
            {
              label: "Defending",
              data: ["72.0", "74", "70"],
              backgroundColor: "rgba(4,108,41,0.5)",
            },
          ],
        },
        type: "radar",
      },
      {
        data: {
          labels: ["Diving", "Handling", "Kicking", "Positioning", "Reflexes"],
          datasets: [
            {
              label: "GoalKeeping",
              data: ["13", "10", "11", "14", "9"],
              backgroundColor: "rgba(202,204,24,0.5)",
            },
          ],
        },
        type: "radar",
      },
    ],
    historicalData: [
      {
        data: {
          labels: ["2019", "2020", "2021"],
          datasets: [
            {
              label: "Pace",
              data: ["65.0", "73.0", "73.0"],
              backgroundColor: "rgba(103,124,234,0.5)",
            },
            {
              label: "Shooting",
              data: ["33.0", "37.0", "37.0"],
              backgroundColor: "rgba(110,65,18,0.5)",
            },
            {
              label: "Passing",
              data: ["43.0", "49.0", "50.0"],
              backgroundColor: "rgba(235,137,92,0.5)",
            },
            {
              label: "Dribbling",
              data: ["45.0", "56.0", "57.0"],
              backgroundColor: "rgba(41,157,168,0.5)",
            },
            {
              label: "Defending",
              data: ["62.0", "73.0", "72.0"],
              backgroundColor: "rgba(83,139,241,0.5)",
            },
            {
              label: "Physic",
              data: ["66.0", "72.0", "70.0"],
              backgroundColor: "rgba(188,58,97,0.5)",
            },
          ],
        },
        type: "line",
      },
      {
        data: {
          labels: ["2019", "2020", "2021"],
          datasets: [
            {
              label: "Crossing",
              data: ["48", "48", "48"],
              backgroundColor: "rgba(41,159,63,0.5)",
            },
            {
              label: "Finishing",
              data: ["25", "25", "25"],
              backgroundColor: "rgba(203,58,49,0.5)",
            },
            {
              label: "Heading",
              data: ["69", "73", "73"],
              backgroundColor: "rgba(224,92,3,0.5)",
            },
            {
              label: "Short Passing",
              data: ["50", "54", "56"],
              backgroundColor: "rgba(177,106,241,0.5)",
            },
            {
              label: "Volleys",
              data: ["22", "40", "40"],
              backgroundColor: "rgba(59,116,58,0.5)",
            },
          ],
        },
        type: "line",
      },
      {
        data: {
          labels: ["2019", "2020", "2021"],
          datasets: [
            {
              label: "Dribbling",
              data: ["44", "51", "53"],
              backgroundColor: "rgba(245,149,56,0.5)",
            },
            {
              label: "Curve",
              data: ["39", "52", "52"],
              backgroundColor: "rgba(72,239,251,0.5)",
            },
            {
              label: "FK Accuracy",
              data: ["25", "36", "36"],
              backgroundColor: "rgba(225,172,0,0.5)",
            },
            {
              label: "Long Passing",
              data: ["41", "53", "53"],
              backgroundColor: "rgba(27,198,251,0.5)",
            },
            {
              label: "Ball Control",
              data: ["42", "57", "58"],
              backgroundColor: "rgba(68,40,163,0.5)",
            },
          ],
        },
        type: "line",
      },
      {
        data: {
          labels: ["2019", "2020", "2021"],
          datasets: [
            {
              label: "Acceleration",
              data: ["61", "72", "72"],
              backgroundColor: "rgba(164,86,21,0.5)",
            },
            {
              label: "Sprint",
              data: ["69", "73", "73"],
              backgroundColor: "rgba(177,225,129,0.5)",
            },
            {
              label: "Agility",
              data: ["45", "61", "61"],
              backgroundColor: "rgba(238,190,50,0.5)",
            },
            {
              label: "Reactions",
              data: ["44", "71", "66"],
              backgroundColor: "rgba(213,243,62,0.5)",
            },
            {
              label: "Balance",
              data: ["65", "68", "68"],
              backgroundColor: "rgba(154,101,230,0.5)",
            },
          ],
        },
        type: "line",
      },
      {
        data: {
          labels: ["2019", "2020", "2021"],
          datasets: [
            {
              label: "Shot Power",
              data: ["45", "60", "60"],
              backgroundColor: "rgba(87,60,156,0.5)",
            },
            {
              label: "Jumping",
              data: ["80", "83", "83"],
              backgroundColor: "rgba(103,102,117,0.5)",
            },
            {
              label: "Stamina",
              data: ["65", "68", "68"],
              backgroundColor: "rgba(41,102,186,0.5)",
            },
            {
              label: "Strength",
              data: ["70", "77", "74"],
              backgroundColor: "rgba(214,218,186,0.5)",
            },
            {
              label: "Long Shots",
              data: ["45", "45", "45"],
              backgroundColor: "rgba(57,159,48,0.5)",
            },
          ],
        },
        type: "line",
      },
      {
        data: {
          labels: ["2019", "2020", "2021"],
          datasets: [
            {
              label: "Aggression",
              data: ["55", "61", "61"],
              backgroundColor: "rgba(2,58,100,0.5)",
            },
            {
              label: "Interceptions",
              data: ["58", "76", "73"],
              backgroundColor: "rgba(166,245,167,0.5)",
            },
            {
              label: "Positioning",
              data: ["21", "25", "25"],
              backgroundColor: "rgba(116,195,19,0.5)",
            },
            {
              label: "Vision",
              data: ["33", "40", "40"],
              backgroundColor: "rgba(75,46,220,0.5)",
            },
            {
              label: "Penalties",
              data: ["32", "32", "32"],
              backgroundColor: "rgba(77,83,109,0.5)",
            },
          ],
        },
        type: "line",
      },
      {
        data: {
          labels: ["2019", "2020", "2021"],
          datasets: [
            {
              label: "Marking",
              data: ["62.0", "73.0", "72.0"],
              backgroundColor: "rgba(99,43,243,0.5)",
            },
            {
              label: "Standing Tackle",
              data: ["65", "74", "74"],
              backgroundColor: "rgba(33,88,227,0.5)",
            },
            {
              label: "Sliding Tackle",
              data: ["62", "70", "70"],
              backgroundColor: "rgba(207,223,154,0.5)",
            },
          ],
        },
        type: "line",
      },
      {
        data: {
          labels: ["2019", "2020", "2021"],
          datasets: [
            {
              label: "Diving",
              data: ["13", "13", "13"],
              backgroundColor: "rgba(186,61,112,0.5)",
            },
            {
              label: "Handling",
              data: ["10", "10", "10"],
              backgroundColor: "rgba(160,165,217,0.5)",
            },
            {
              label: "Kicking",
              data: ["11", "11", "11"],
              backgroundColor: "rgba(252,135,9,0.5)",
            },
            {
              label: "Positioning",
              data: ["14", "14", "14"],
              backgroundColor: "rgba(33,224,48,0.5)",
            },
            {
              label: "Reflexes",
              data: ["9", "9", "9"],
              backgroundColor: "rgba(100,37,50,0.5)",
            },
          ],
        },
        type: "line",
      },
    ],
  },
  positionInfo: [
    [
      {
        gk: "9",
      },
    ],
    [
      {
        lb: "67+2",
        lcb: "70+2",
        cb: "70+2",
        rcb: "70+2",
        rb: "67+2",
      },
    ],
    [
      {
        lwb: "65+2",
        ldm: "64+2",
        cdm: "64+2",
        rdm: "64+2",
        rwb: "65+2",
      },
    ],
    [
      {
        lm: "53+2",
        lcm: "54+2",
        cm: "54+2",
        rcm: "54+2",
        rm: "53+2",
      },
    ],
    [
      {
        lam: "50+2",
        cam: "50+2",
        ram: "50+2",
      },
    ],
    [
      {
        lw: "51+0",
        lf: "50+0",
        rf: "50+0",
        rw: "51+0",
      },
    ],
    [
      {
        ls: "51+2",
        st: "51+2",
        rs: "51+2",
      },
    ],
  ],
};

jest.mock("react-chartjs-2", () => ({
  Bar: () => null, // add any additional chart types here
  Line: () => null,
  Radar: () => null,
}));

describe("Player Component Test", () => {
  it("Player Component Test", async () => {
    const wrapper = mount(
      <PlayerComponent
        match={{ params: { id: 1 }, isExact: true, path: "", url: "" }}
      />
    );
    const resultDiv = (
      <div id="playerComponentDiv">
        <PlayerInfoComponent
          playerData={response.playerData}
          playerInfo={response.playerInfo}
        />
        <PlayerCharts chartInfo={response.chartData.radarData} />
        <PlayerCharts
          chartInfo={response.chartData.historicalData}
          id="lineChartDiv"
        />

        <FieldComponent data={response.positionInfo} />
      </div>
    );
    expect(wrapper.state("results")).toBeNull;
    axios.get.mockResolvedValue({ data: response });
    await wrapper.instance().getPlayerData();
    console.log("wrapper => " + wrapper.debug());

    expect(wrapper.state("results")).toStrictEqual(resultDiv);

    expect(axios.get).toHaveBeenCalledWith(`/getPlayer/1`);

    wrapper.update();

    const infoItems = wrapper.find("PlayerInfoComponent");
    const charts = wrapper.find("PlayerCharts");
    expect(infoItems.length).toEqual(1);
    expect(charts.length).toEqual(2);
  });
});
