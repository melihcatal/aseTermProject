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
  const playerData = {
    age: "31",
    club: "FC Bayern München",
    overall: "82",
    value: "16500000",
    position: "CB",
    preferredFoot: "Right",
    workRate: "Medium/Medium",
    bodyType: "Stocky",
  };
  const playerDataLength = Object.keys(playerData).length;

  const wrapper = mount(
    <PlayerInfoComponent playerData={playerData} playerInfo={playerInfo} />
  );
  const infoItems = wrapper.find("PlayerInfoItem");
  const identiyInfo = wrapper.find("PlayerIdentiy");

  const warning = wrapper.find(".warning");
  expect(warning.length).toEqual(0);
  expect(identiyInfo.length).toEqual(1);
  expect(infoItems.length).toEqual(playerDataLength);
});

test("Should warn about no data", () => {
  const response = [];
  const wrapper = mount(<PlayerInfoComponent data={response} />);

  const infoItems = wrapper.find("PlayerInfoItem");
  const warning = wrapper.find(".warning");
  const identiyInfo = wrapper.find("PlayerIdentiy");

  expect(infoItems.length).toEqual(response.length);
  expect(identiyInfo.length).toEqual(0);

  expect(warning.length).toEqual(1);
});
