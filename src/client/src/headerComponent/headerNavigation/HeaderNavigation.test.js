import HeaderNavigation from "./HeaderNavigation";
import { shallow } from "enzyme";

describe("Header Navigation Testing", () => {
  it("should render two navigation items", () => {
    const wrapper = shallow(<HeaderNavigation />);

    const navigationItems = wrapper.find("HeaderNavigationItem");

    expect(navigationItems.length).toBe(2);
  });
});
