import { shallow, mount } from "enzyme";
import SearchComponent from "./SearchComponent";
const axios = require("axios");
jest.mock("axios");

let wrapper;
beforeEach(() => {
  wrapper = mount(<SearchComponent />);
});

describe("Search Component Test", () => {
  it("Test Search Component and Results ", async () => {
    const initialResults = "";
    const searchText = "Ronaldo";
    const searchInput = wrapper.find("input");
    const resolveData = [
      {
        playerName: "Ronaldo",
        playerId: 1,
        imageSource: "https://cdn.sofifa.com/players/020/801/19_240.png",
      },
    ];

    let resultsComponent = wrapper.find("Results");
    expect(resultsComponent).toHaveLength(0);
    expect(wrapper.state("results")).toBeNull;
    searchInput.simulate("change", { target: { value: searchText } });
    axios.get.mockResolvedValue(resolveData);
    await wrapper.instance().getPlayerData(searchText);
    expect(wrapper.state("results")).toBe(resolveData);

    expect(axios.get).toHaveBeenCalledWith(
      `http://database:3000/searchPlayer/${searchText}`
    );

    wrapper.update();
    resultsComponent = wrapper.find("Results");
    expect(resultsComponent).toHaveLength(1);
    expect(resultsComponent.props().results).toBe(resolveData);
  });
});
