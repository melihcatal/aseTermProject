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
    const searchText = "Ronaldo";
    const searchInput = wrapper.find("input");
    const resolveData = [
      {
        name: "Ronaldo",
        _id: 1,
        imageUrl: "https://cdn.sofifa.com/players/020/801/19_240.png",
        overall: 86,
      },
    ];
    const response = {
      data: resolveData,
    };

    let resultsComponent = wrapper.find("Results");
    expect(resultsComponent).toHaveLength(0);
    expect(wrapper.state("results")).toBeNull;
    axios.get.mockResolvedValue(response);

    await wrapper.instance().getPlayerData(searchText);

    expect(wrapper.state("results")).toBe(resolveData);

    expect(axios.get).toHaveBeenCalledWith(`/searchPlayer/${searchText}`);
    wrapper.update();

    resultsComponent = wrapper.find("Results");
    expect(resultsComponent).toHaveLength(1);
    expect(resultsComponent.props().results).toBe(resolveData);
  });
});
