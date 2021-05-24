const { shallow, mount } = require("enzyme");
const { MemoryRouter } = require("react-router");
const { default: ComparePlayersTable } = require("./ComparePlayersTable");
const sampleResponse = require("./sampleResponse.json");

test("Should Render Table Data", () => {
  const wrapper = shallow(
    <MemoryRouter>
      <ComparePlayersTable
        homeTeam={sampleResponse.homeTeamPlayers}
        awayTeam={sampleResponse.awayTeamPlayers}
      />
    </MemoryRouter>
  );
  const td = wrapper.find("td");
  expect(td).not.toBeNull();
});
