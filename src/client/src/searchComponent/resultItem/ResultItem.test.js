import { shallow } from "enzyme";
import ResultItem from "./ResultItem";
import { MemoryRouter } from "react-router-dom";

let wrapper;
let player;

beforeEach(() => {
  player = {
    playerName: "Ronaldo",
    playerId: 1,
    imageSource: "https://cdn.sofifa.com/players/020/801/19_240.png",
  };

  wrapper = shallow(
    <MemoryRouter>
      <ResultItem player={player} />
    </MemoryRouter>
  )
    .find(ResultItem)
    .dive();
});
describe("Search Result Item Testing", () => {
  it("Test image and name properties ", () => {
    const name = wrapper.find("h3");
    const image = wrapper.find("img");

    expect(name.text()).toBe(player.playerName);
    expect(image.props().src).toBe(player.imageSource);
  });

  it("Testing Link", () => {
    const link = wrapper.find("Link");
    expect(link.props().to).toBe(`/players/${player.playerId}`);
  });
});
