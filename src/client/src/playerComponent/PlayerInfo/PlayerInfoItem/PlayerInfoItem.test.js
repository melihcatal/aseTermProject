import { shallow } from "enzyme";
import PlayerInfoItem from "./PlayerInfoItem";

test("Should render player info with title and data", () => {
  const title = "Rating";
  const value = "92";
  const data = {
    title: title,
    value: value,
  };
  const wrapper = shallow(<PlayerInfoItem data={data} />);

  const wrapperTitle = wrapper.find("h4");
  const wrapperValue = wrapper.find("h3");
  expect(wrapperTitle.text()).toBe(title);
  expect(wrapperValue.text()).toBe(value);
});
