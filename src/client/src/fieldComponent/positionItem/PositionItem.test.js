import { mount, shallow } from "enzyme";
import PositionItem from "./PositionItem";
require("dotenv").config({
  path: "../../.env",
});
test("Should render given position name and color with calculated background color", () => {
  const position = "ST";
  const score = "80";
  const expectedBackground = `rgb(235,${Math.floor(
    score * process.env.FIELD_BACK_COEF
  )},52)`;
  const info = {
    position: position,
    score: score,
  };

  const wrapper = shallow(<PositionItem info={info} />);

  const div = wrapper.find("div");
  const h4 = wrapper.find("h4");
  const h3 = wrapper.find("h3");

  expect(div.props().style.backgroundColor).toBe(expectedBackground);
  expect(h4.text()).toBe(position);
  expect(h3.text()).toBe(score);
});
