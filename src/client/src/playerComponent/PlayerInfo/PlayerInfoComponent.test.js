import { mount } from "enzyme";
import PlayerInfoComponent from "./PlayerInfoComponent";

test("Should render certain number of player info items", () => {
  const title = "Rating";
  const value = "92";
  const data = {
    title: title,
    value: value,
  };
  const response = [data, data, data, data, data];
  const wrapper = mount(<PlayerInfoComponent data={response} />);
  const infoItems = wrapper.find("PlayerInfoItem");
  const warning = wrapper.find("h4");
  expect(warning).toBeUndefined;

  expect(infoItems.length).toEqual(response.length);
});

test("Should warn about no data", () => {
  const response = [];
  const wrapper = mount(<PlayerInfoComponent data={response} />);
  const infoItems = wrapper.find("PlayerInfoItem");
  const warning = wrapper.find("h4");
  expect(infoItems.length).toEqual(response.length);
  expect(warning).not.toBeUndefined;
});
