const { MemoryRouter } = require("react-router");
import { mount } from "enzyme";
import ComparePlayerComponent from "./ComparePlayerComponent";
const axios = require("axios");
const sampleResponse = require("./sampleResponse.json");

jest.mock("axios");
const getData = jest.fn();
let wrapper;
let searchQuery =
  "?homePlayer=60a79acc6b148a03fb95daa4&awayPlayer=60a79aca6b148a03fb95c100";
let homePlayer = "60a79acc6b148a03fb95daa4";
let awayPlayer = "60a79aca6b148a03fb95c100";
beforeAll(() => {
  axios.get.mockResolvedValue({ data: sampleResponse });
  wrapper = mount(
    <MemoryRouter>
      <ComparePlayerComponent
        location={{
          search: searchQuery,
          state: { homePlayerID: homePlayer, awayPlayerID: awayPlayer },
        }}
      />
    </MemoryRouter>
  );
  expect(axios.get).toHaveBeenCalledWith(`/comparePlayer${searchQuery}`);
});

describe("Compare Player Test", () => {
  it("Compare Players Component", () => {
    wrapper.update();
    const playerInfo = wrapper.find("ComparePlayerInfo");
    const fieldComponent = wrapper.find("FieldComponent");
    const playerCharts = wrapper.find("PlayerCharts");
    expect(playerInfo.length).toBe(2);
    expect(fieldComponent.length).toBe(2);
    expect(playerCharts.length).toBe(2);
  });
});
