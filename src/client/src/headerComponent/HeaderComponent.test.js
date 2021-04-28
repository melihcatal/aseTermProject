import HeaderComponent from "./HeaderComponent";
import { shallow } from "enzyme";

let wrapper;
beforeAll(() => {
  wrapper = shallow(<HeaderComponent />);
});
describe("Header Testing", () => {
  it("should render SearchBar", () => {
    const searchBar = wrapper.find("SearchComponent");
    expect(searchBar.length).toBe(1);
  });
});
