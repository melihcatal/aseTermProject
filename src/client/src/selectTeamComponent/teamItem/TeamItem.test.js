import { mount } from "enzyme";
import TeamItem from "./TeamItem";

describe("Team Item Test", () => {
  it("Should render default image source if not provided else", () => {
    const setClicked = jest.fn((isClicked) => console.log(isClicked));
    const setTurn = jest.fn((turn) => console.log(turn));
    const isSelected = false;
    const imageSource = "../visuals/icons/football-club.png";
    const wrapper = mount(
      <TeamItem
        setClicked={setClicked}
        setTurn={setTurn}
        isSelected={isSelected}
      />
    );

    const wrapperImage = wrapper.find("img");
    const wrapperName = wrapper.find("h4");

    expect(wrapperImage.props().src).toEqual(imageSource);
    expect(wrapperName).toBeUndefined;
  });
  it("Should render  image source if provided ", () => {
    const setClicked = jest.fn((isClicked) => console.log(isClicked));
    const setTurn = jest.fn((turn) => console.log(turn));
    const isSelected = true;
    const imageSource = "asdfg.png";
    const name = "Trabzonspor";
    const wrapper = mount(
      <TeamItem
        setClicked={setClicked}
        setTurn={setTurn}
        isSelected={isSelected}
        imageSource={imageSource}
        name={name}
      />
    );

    const wrapperImage = wrapper.find("img");
    const wrapperName = wrapper.find("h4");
    expect(wrapperImage.props().src).toEqual(imageSource);
    expect(wrapperName.text()).toEqual(name);
  });

  it("Should update props method on click", () => {
    const setClicked = jest.fn((isClicked) => console.log(isClicked));
    const setTurn = jest.fn((turn) => console.log(turn));
    const isSelected = true;
    const imageSource = "asdfg.png";
    const turn = "1";
    const wrapper = mount(
      <TeamItem
        setClicked={setClicked}
        setTurn={setTurn}
        isSelected={isSelected}
        imageSource={imageSource}
        turn={turn}
      />
    );

    const wrapperDiv = wrapper.find("#compareSelectItem");
    wrapperDiv.simulate("click");
    expect(setClicked).toHaveBeenLastCalledWith(true);
    expect(setTurn).toHaveBeenLastCalledWith(turn);
  });
});
