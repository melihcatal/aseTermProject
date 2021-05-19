import { mount, shallow } from "enzyme";
import FieldComponent from "./FieldComponent";

test("Should render 7 field row", () => {
  const positions = [
    [
      {
        lb: "67+2",
        lcb: "70+2",
        cb: "70+2",
        rcb: "70+2",
        rb: "67+2",
      },
      {
        lb: "67+2",
        lcb: "70+2",
        cb: "70+2",
        rcb: "70+2",
        rb: "67+2",
      },
    ],
  ];
  const wrapper = mount(<FieldComponent data={positions} />);

  const fieldRows = wrapper.find("FieldRow");

  expect(fieldRows.length).toBe(positions.length);
});
