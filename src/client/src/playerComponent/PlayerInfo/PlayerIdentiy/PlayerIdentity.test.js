import { shallow } from "enzyme";
import PlayerIdentiy from "./PlayerIdentiy";

test("Should render photo , name and nationality of player", () => {
  const imageUrl =
    "https://asefifaplayers.s3.eu-central-1.amazonaws.com/players21/notfound.png";
  const name = "Ronaldo";
  const nationality = "Portugal";

  const playerInfo = {
    imageUrl: imageUrl,
    name: name,
    nationality: nationality,
  };
  const wrapper = shallow(<PlayerIdentiy playerInfo={playerInfo} />);

  const wrapperImage = wrapper.find("img");
  const wrapperName = wrapper.find("h3");
  const wrapperNationality = wrapper.find("h4");

  expect(wrapperImage.props().src).toBe(imageUrl);
  expect(wrapperName.text()).toBe(name);
  expect(wrapperNationality.text()).toBe(nationality);
});
