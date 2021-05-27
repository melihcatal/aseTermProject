const axios = require("axios");
const { mount } = require("enzyme");
const { MemoryRouter } = require("react-router");
const { default: GameService } = require("./GameService");
const sampleResponse = require("./sampleResponse.json");

jest.mock("axios");
let wrapper;
let searchQuery = "?fromDate=2021-05-08&toDate=2021-05-08";
let fromDate = "2021-05-08";
let toDate = "2021-05-08";
beforeAll(() => {
  axios.get.mockResolvedValue({ data: sampleResponse });
  wrapper = mount(
    <MemoryRouter>
      <GameService />
    </MemoryRouter>
  );
  expect(axios.get).toHaveBeenCalledWith("/getFixtures", {
    params: { fromDate: fromDate, toDate: toDate },
  });
});
describe("Game Service Testing", () => {
  it("Test Get Fixture ", () => {
    wrapper.update();
    const leagues = wrapper.find("Leagues");
    expect(leagues.length).toBe(sampleResponse.length);
  });
});
