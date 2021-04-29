import HeaderNavigationItem from "./HeaderNavigationItem";
import { shallow } from "enzyme";

describe("Header Navigation Testing", () => {
  it("should render an image and title", () => {
    const isPopup = false;
    const imageSource = "./visuals/icons/ball.png";
    const title = "Games";

    const wrapper = shallow(
      <HeaderNavigationItem
        isPopup={isPopup}
        imageSource={imageSource}
        title={title}
      />
    );

    const wrapperDiv = wrapper.find("div");
    const wrapperImage = wrapper.find("img");
    const wrapperTitle = wrapper.find("h5");

    expect(wrapperImage).toHaveLength(1);
    expect(wrapperImage.props().src).toBe(imageSource);
    expect(wrapperTitle).toHaveLength(1);
    expect(wrapperTitle.text()).toBe(title);

    expect(wrapperDiv.props().onClick).toBeUndefined;
  });

  it("should have open popup onclick event", () => {
    const isPopup = true;
    const imageSource = "./visuals/icons/ball.png";
    const title = "Games";

    const wrapper = shallow(
      <HeaderNavigationItem
        isPopup={isPopup}
        imageSource={imageSource}
        title={title}
      />
    );
    const wrapperDiv = wrapper.find("div");

    expect(wrapperDiv.props().onClick).not.toBeUndefined;
  });
});
