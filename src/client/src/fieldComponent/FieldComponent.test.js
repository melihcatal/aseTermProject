import { mount, shallow } from "enzyme";
import FieldComponent from "./FieldComponent";

test("Should render 7 field row", () => {
  const position = "ST";
  const score = "80";
  const info = {
    position: position,
    score: score,
  };
  const data = [[info], [info]];
  const wrapper = mount(<FieldComponent data={data} />);

  const fieldRows = wrapper.find("FieldRow");

  expect(fieldRows.length).toBe(data.length);
});
