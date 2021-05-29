import { shallow, mount } from "enzyme";
import FieldRow from "./FieldRow";

test("Should have Render desired positions ", () => {
  const positions = [
    {
      lb: "67+2",
      lcb: "70+2",
      cb: "70+2",
      rcb: "70+2",
      rb: "67+2",
    },
  ];

  const wrapper = mount(<FieldRow positions={positions} />);

  const wrapperPositions = wrapper.find("PositionItem");

  expect(wrapperPositions.length).toBe(Object.entries(positions[0]).length);
});
