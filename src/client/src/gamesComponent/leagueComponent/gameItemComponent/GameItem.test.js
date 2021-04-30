import { shallow } from "enzyme";
import GameItem from "./GameItem";

test("Game Item Test", () => {
  const gameID = 1;
  const homeTeam = "Trabzonspor";
  const awayTeam = "Antalyaspor";
  const startTime = "19:00";

  const gameInfo = {
    gameID: gameID,
    homeTeam: homeTeam,
    awayTeam: awayTeam,
    startTime: startTime,
  };
  const wrapper = shallow(<GameItem gameInfo={gameInfo} />);

  const wrapperLink = wrapper.find("Link");
  const wrapperTeamsInfo = wrapper.find("#gameTeamsInfo");
  const wrapperTimeInfo = wrapper.find("#gameTimeInfo");

  expect(wrapperLink.props().to).toBe(`/game/${gameID}`);
  expect(wrapperTeamsInfo.text()).toBe(`${homeTeam}-${awayTeam}`);
  expect(wrapperTimeInfo.text()).toBe(startTime);
});
