import { mount, shallow } from "enzyme";
import { MemoryRouter } from "react-router";
import SelectTeamComponent from "./SelectTeamComponent";

describe("Select Team Component Test", () => {
  it("Should render two team item and 1 team model", () => {
    const wrapper = mount(
      <MemoryRouter>
        <SelectTeamComponent />
      </MemoryRouter>
    );
    const wrapperTeamItem = wrapper.find("TeamItem");
    const wrapperModel = wrapper.find("TeamModel");
    expect(wrapperTeamItem.length).toBe(2);
    expect(wrapperModel.length).toBe(1);
  });
});
