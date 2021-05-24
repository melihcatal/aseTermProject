const { shallow } = require("enzyme");
const { default: CompareLogo } = require("./CompareLogo");

test("Should render compare logo", () => {
  const homeLogo = "home logo";
  const homeName = "home name";
  const awayLogo = "away logo";
  const awayName = "away name";
  const wrapper = shallow(
    <CompareLogo
      homeLogo={homeLogo}
      homeName={homeName}
      awayLogo={awayLogo}
      awayName={awayName}
    />
  );

  const imgs = wrapper.find("img");
  const h4s = wrapper.find("h4");

  expect(imgs.at(0).props().src).toBe(homeLogo);
  expect(imgs.at(1).props().src).toBe(awayLogo);
  expect(h4s.at(0).text()).toBe(homeName);
  expect(h4s.at(1).text()).toBe(awayName);
});
