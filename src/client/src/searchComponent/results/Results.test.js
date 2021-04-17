import { shallow, mount } from "enzyme";
import { MemoryRouter } from "react-router";
import Results from "./Results";

beforeEach(() => {});

describe("Search Result Testing", () => {
  it("Test Rendering with Found Results ", () => {
    const player1 = {
      playerName: "Ronaldo",
      playerId: 1,
      imageSource: "https://cdn.sofifa.com/players/020/801/19_240.png",
    };
    const player2 = {
      playerName: "Messi",
      playerId: 2,
      imageSource: "https://cdn.sofifa.com/players/158/023/21_240.png",
    };
    const results = [player1, player2];
    const wrapper = mount(
      <MemoryRouter>
        <Results results={results} />
      </MemoryRouter>
    );
    const resultItems = wrapper.find("ResultItem");
    const warning = wrapper.find("h3");
    expect(resultItems).toHaveLength(2);
    expect(warning).toBeNull;
  });
  it("Test Rendering with No Results ", () => {
    const results = [];
    const wrapper = mount(
      <MemoryRouter>
        <Results results={results} />
      </MemoryRouter>
    );
    const resultItems = wrapper.find("ResultItem");
    const warning = wrapper.find("h3");
    expect(resultItems).toBeNull;
    expect(warning.text()).toBe("Not Found");
  });

  it("Test Rendering with Not Valid Results ", () => {
    const results = ["Not Valid"];
    const wrapper = mount(
      <MemoryRouter>
        <Results results={results} />
      </MemoryRouter>
    );
    const resultItems = wrapper.find("ResultItem");
    const warning = wrapper.find("h3");
    expect(resultItems).toBeNull;
    expect(warning.text()).toBe("Error");
  });
});
