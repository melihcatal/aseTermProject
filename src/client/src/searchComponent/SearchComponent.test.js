import { shallow, mount } from "enzyme";
import SearchComponent from "./SearchComponent";
const axios = require("axios");
jest.mock("axios");

let wrapper;
beforeEach(() => {
  wrapper = mount(<SearchComponent />);
});

describe("Search Component Test", () => {
  it("Keeping search variable as state ", () => {
    const initialValue = "";
    const searchText = "Messi";
    const searchInput = wrapper.find("input");
    const resolveData = [
      {
        playerName: "Lionel Messi",
        id: -1,
      },
    ];

    expect(wrapper.state("searchText")).toBe(initialValue);

    searchInput.simulate("change", { target: { value: searchText } });

    expect(wrapper.state("searchText")).toBe(searchText);

    axios.get.mockResolvedValue(resolveData);

    expect(axios.get).toHaveBeenCalledWith(
      `http://database:3000/searchPlayer/${searchText}`
    );
  });
});
