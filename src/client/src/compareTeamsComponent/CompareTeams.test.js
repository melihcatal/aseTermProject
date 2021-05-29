const { mount, shallow } = require("enzyme");
const { MemoryRouter } = require("react-router");
import CompareTeams from "./CompareTeams";
const sampleResponse = require("./sampleResponse.json");
const axios = require("axios");
jest.mock("axios");
const getData = jest.fn();
let wrapper;
let searchQuery = "?homeTeam=Trabzonspor&awayTeam=Liverpool";
let homeLogo = "homeLogo";
let awayLogo = "awayLogo";
beforeAll(() => {
  axios.get.mockResolvedValue({ data: sampleResponse });
  wrapper = mount(
    <MemoryRouter>
      <CompareTeams
        location={{
          search: searchQuery,
          state: { homeLogo: homeLogo, awayLogo: awayLogo },
        }}
      />
    </MemoryRouter>
  );
  expect(axios.get).toHaveBeenCalledWith(`/compareTeams/${searchQuery}`);
});
describe("Compare Teams Testing", () => {
  it("Compare Teams test retrival of data", () => {
    wrapper.update();
    const logo = wrapper.find("CompareLogo");
    const table = wrapper.find("ComparePlayersTable");
    const fieldPlayers = wrapper.find("FieldPlayersComponent");
    const playerCharts = wrapper.find("PlayerCharts");
    expect(logo.length).toBe(1);
    expect(logo.props().homeLogo).toBe(homeLogo);
    expect(table.length).toBe(1);
    expect(table.props().homeTeam).toEqual(sampleResponse.homeTeamPlayers);
    expect(table.props().awayTeam).toEqual(sampleResponse.awayTeamPlayers);

    expect(fieldPlayers.length).toBe(2);
    expect(fieldPlayers.at(0).props().data).toEqual(
      sampleResponse.homeTeamPlayerData
    );

    expect(playerCharts.length).toBe(2);
    expect(playerCharts.at(0).props().chartInfo).toEqual(
      sampleResponse.stackData
    );
    expect(playerCharts.at(1).props().chartInfo).toEqual(
      sampleResponse.radarData
    );
  });
});
