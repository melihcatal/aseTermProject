const { shallow, mount } = require("enzyme");
const { default: Leagues } = require("./Leagues");
const sampleResponse = require("../sampleResponse.json");
const { MemoryRouter } = require("react-router");
test("Test Leagues with data", () => {
  const wrapper = mount(
    <MemoryRouter>
      <Leagues data={sampleResponse[0]} />
    </MemoryRouter>
  );

  const gameItems = wrapper.find("GameItem");
  expect(gameItems.length).toBe(sampleResponse[0].games.length);
});
test("Test Leagues", () => {
  const sampleResponseNoGame = {
    leagueInfo: {
      id: 203,
      name: "Super Lig",
      country: "Turkey",
      logo: "https://media.api-sports.io/football/leagues/203.png",
      flag: "https://media.api-sports.io/flags/tr.svg",
      season: 2020,
      round: "Regular Season - 40",
    },
    games: [],
  };
  const wrapper = mount(
    <MemoryRouter>
      <Leagues data={sampleResponseNoGame} />
    </MemoryRouter>
  );

  const gameItems = wrapper.find("GameItem");
  expect(gameItems.length).toBe(sampleResponseNoGame.games.length);
  const td = wrapper.find("td");
  expect(td.at(10).text()).toBe("No Game");
});
