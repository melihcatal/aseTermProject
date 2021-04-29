import ComparePopupItem from "./ComparePopupItem";
import { shallow } from "enzyme";

describe("Compare Popup Item testing", () => {
  it("should render compare popup item ", () => {
    const imageSource = "./visuals/icons/football-club.png";
    const title = "Teams";
    const wrapper = shallow(
      <ComparePopupItem imageSource={imageSource} title={title} />
    );

    const wrapperImageSource = wrapper.find("img");
    const wrapperTitle = wrapper.find("h3");
    const link = wrapper.find("Link");

    expect(wrapperImageSource.props().src).toBe(imageSource);
    expect(wrapperTitle.text()).toBe(title);
    expect(link.props().to).toBe(`/compare/${title}`);
  });
});
