const { shallow } = require("enzyme");
const { default: GameItem } = require("./GameItem");

describe("Game Item Test", () => {
  it("Should Render Game Item with Completed Game", () => {
    const data = {
      gameID: 592839,
      gameDate: "2021-05-08T13:30:00+02:00",
      gameStatus: "FT",
      homeTeam: {
        id: "60a0f8c72f6bf50887fa3371",
        name: "Leeds United",
        logo: "https://asefifaplayers.s3.eu-central-1.amazonaws.com/clubLogo/Leeds+United.png",
        winner: true,
      },
      awayTeam: {
        id: "60a0f8c72f6bf50887fa3367",
        name: "Tottenham Hotspur",
        logo: "https://asefifaplayers.s3.eu-central-1.amazonaws.com/clubLogo/Tottenham+Hotspur.png",
        winner: false,
      },
      gameScore: "3-1",
    };

    const wrapper = shallow(<GameItem data={data} />);
    const td = wrapper.find("td");
    const images = wrapper.find("img");
    expect(td.at(0).text()).toBe("FT2021-05-08");
    expect(td.at(3).text()).toBe(data.homeTeam.name);
    expect(td.at(4).text()).toBe(data.gameScore);
    expect(td.at(5).text()).toBe(data.awayTeam.name);

    expect(images.at(0).props().src).toBe(data.homeTeam.logo);
    expect(images.at(1).props().src).toBe(data.awayTeam.logo);
    expect(images.at(2).props().src).toBe("../visuals/icons/compare.png");
  });
  it("Should Render Game Item with Not Completed Game", () => {
    const data = {
      gameID: 592839,
      gameDate: "2021-05-08T13:30:00+02:00",
      gameStatus: "NS",
      homeTeam: {
        id: "60a0f8c72f6bf50887fa3371",
        name: "Leeds United",
        logo: "https://asefifaplayers.s3.eu-central-1.amazonaws.com/clubLogo/Leeds+United.png",
        winner: true,
      },
      awayTeam: {
        id: "60a0f8c72f6bf50887fa3367",
        name: "Tottenham Hotspur",
        logo: "https://asefifaplayers.s3.eu-central-1.amazonaws.com/clubLogo/Tottenham+Hotspur.png",
        winner: false,
      },
      gameScore: null,
    };

    const wrapper = shallow(<GameItem data={data} />);
    const td = wrapper.find("td");
    const images = wrapper.find("img");
    expect(td.at(0).text()).toBe("NS2021-05-08");
    expect(td.at(3).text()).toBe(data.homeTeam.name);
    expect(td.at(4).text()).toBe("-");
    expect(td.at(5).text()).toBe(data.awayTeam.name);

    expect(images.at(0).props().src).toBe(data.homeTeam.logo);
    expect(images.at(1).props().src).toBe(data.awayTeam.logo);
    expect(images.at(2).props().src).toBe("../visuals/icons/compare.png");
  });
});
