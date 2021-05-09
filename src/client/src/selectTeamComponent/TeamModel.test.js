import { shallow } from "enzyme";
import TeamModel from "./TeamModel";
describe("Model Testing", () => {
  it("should call close function on click button ", () => {
    const closeModel = jest.fn((isClosed) => {
      console.log(isClosed);
    });
    const wrapper = shallow(<TeamModel closeModel={closeModel} />);

    const button = wrapper.find("#closeButton");
    button.simulate("click");
    expect(closeModel).toHaveBeenCalledWith(false);
  });

  it("should render searchbar", () => {
    const wrapper = shallow(<TeamModel />);
    const searchBar = wrapper.find("SearchBar");
    expect(searchBar.length).toBe(1);
  });
});
