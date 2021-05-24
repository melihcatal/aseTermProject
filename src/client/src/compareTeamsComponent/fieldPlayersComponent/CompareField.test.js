const { shallow, mount } = require("enzyme");
const { default: FieldPlayersComponent } = require("./FieldPlayersComponent");
const { MemoryRouter } = require("react-router");
const sampleResponse = require("./sampleResponse.json");
test("Test Compare Field Item", () => {
  const wrapper = mount(
    <MemoryRouter>
      <FieldPlayersComponent data={sampleResponse.homeTeamPlayerData} />
    </MemoryRouter>
  );
  const compareFieldRows = wrapper.find("CompareFieldRow");

  expect(compareFieldRows.length).toBe(
    sampleResponse.homeTeamPlayerData.length
  );
});
