import { shallow } from "enzyme";
import ResultItem from "./ResultItem";
import { MemoryRouter } from "react-router-dom";

let wrapper;
let player;

beforeEach(() => {
  player = {
    name: "Ronaldo",
    _id: 1,
    imageUrl:
      "https://asefifaplayers.s3.eu-central-1.amazonaws.com/players21/101317.png",
    overall: 86,
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
    const overall = wrapper.find("h4");

    expect(name.text()).toBe(player.name);
    expect(overall.text()).toBe(player.overall.toString());

    expect(image.props().src).toBe(player.imageUrl);
  });

  it("Testing Link", () => {
    const link = wrapper.find("Link");
    expect(link.props().to).toBe(`/players/${player._id}`);
  });
});
