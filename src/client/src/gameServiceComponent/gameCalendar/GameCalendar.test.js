const { shallow } = require("enzyme");
const { default: GameCalendar } = require("./GameCalendar");

describe("Testing Game Calender", () => {
  it("Testing get fixtures function", () => {
    const getFixtures = jest.fn(() => {
      console.log("get fixture is called");
    });

    const wrapper = shallow(<GameCalendar getFixtures={getFixtures} />);

    const button = wrapper.find("button");
    button.simulate("click");
    expect(getFixtures.mock.calls.length).toBe(1);
  });
});
