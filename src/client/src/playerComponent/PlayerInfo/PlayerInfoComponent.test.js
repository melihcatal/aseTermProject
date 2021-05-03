import { mount } from "enzyme";
import PlayerInfoComponent from "./PlayerInfoComponent";
const imageUrl =
  "https://asefifaplayers.s3.eu-central-1.amazonaws.com/players21/notfound.png";
const name = "Ronaldo";
const nationality = "Portugal";

const playerInfo = {
  imageUrl: imageUrl,
  name: name,
  nationality: nationality,
};

test("Should render certain number of player info items and player identiy", () => {
  const title = "Rating";
  const value = "92";
  const data = {
    title: title,
    value: value,
  };
  const response = [data, data, data, data, data];
  const wrapper = mount(
    <PlayerInfoComponent data={response} playerInfo={playerInfo} />
  );
  const infoItems = wrapper.find("PlayerInfoItem");
  const warning = wrapper.find(".warning");
  expect(warning.length).toEqual(0);

  expect(infoItems.length).toEqual(response.length);
});

test("Should warn about no data", () => {
  const response = [];
  const wrapper = mount(<PlayerInfoComponent data={response} />);

  const infoItems = wrapper.find("PlayerInfoItem");
  const warning = wrapper.find(".warning");
  expect(infoItems.length).toEqual(response.length);
  expect(warning.length).toEqual(1);
});
