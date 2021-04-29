import ComparePopup from "./ComparePopup";
import { shallow } from "enzyme";

let wrapper;
beforeAll(() => {
  wrapper = shallow(<ComparePopup />);
});
describe("Compare Pop Up Testing", () => {
  it("should render two popup items ", () => {
    const popupItems = wrapper.find("ComparePopupItem");
    expect(popupItems.length).toBe(2);
  });
});
