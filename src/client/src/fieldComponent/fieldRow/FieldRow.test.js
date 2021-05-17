import { shallow } from "enzyme";
import FieldRow from "./FieldRow";

test("Should have Render desired positions ", () => {
  const samplePosition = {
    position: "ST",
    score: "80",
  };
  const positions = [samplePosition, samplePosition];
  const wrapper = shallow(<FieldRow positions={positions} />);

  const wrapperPositions = wrapper.find("PositionItem");

  expect(wrapperPositions.length).toBe(positions.length);
});
