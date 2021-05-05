import { shallow } from "enzyme";
import PlayerInfoItem from "./PlayerInfoItem";

test("Should render player info with title and data", () => {
  const data = {
    age: 30,
  };
  const wrapper = shallow(<PlayerInfoItem data={data} />);

  const wrapperTitle = wrapper.find("h4");
  const wrapperValue = wrapper.find("h3");
  expect(wrapperTitle.text()).toBe("age");
  expect(wrapperValue.text()).toBe("30");
});
