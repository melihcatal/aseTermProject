import LeagueComponent from "./LeagueComponent";
import { shallow, mount } from "enzyme";
import { MemoryRouter } from "react-router";

describe("Test League Component", () => {
  it("should warn no game found ", () => {
    const leagueID = 1;
    const leagueName = "Turkish Super League";
    const games = [];
    const leagueInfo = {
      leagueID: leagueID,
      leagueName: leagueName,
      games: games,
    };
    const notFoundWarning = "Not Found";

    const wrapper = mount(<LeagueComponent leagueInfo={leagueInfo} />);
    const gameItem = wrapper.find("GameItem");
    const warning = wrapper.find("h3");
    const wrapperLeagueName = wrapper.find("#leagueName");

    expect(gameItem).toBeUndefined;
    expect(warning.text()).toBe(notFoundWarning);
    expect(wrapperLeagueName.text()).toBe(leagueName);
  });

  it("should render two games ", () => {
    const gameID = 1;
    const homeTeam = "Trabzonspor";
    const awayTeam = "Antalyaspor";
    const startTime = "19:00";
    const leagueID = 1;
    const leagueName = "Turkish Super League";

    const gameInfo = {
      gameID: gameID,
      homeTeam: homeTeam,
      awayTeam: awayTeam,
      startTime: startTime,
    };
    const games = [gameInfo, gameInfo];

    const leagueInfo = {
      leagueID: leagueID,
      leagueName: leagueName,
      games: games,
    };

    const wrapper = mount(
      <MemoryRouter>
        <LeagueComponent leagueInfo={leagueInfo} />
      </MemoryRouter>
    );
    const gameItem = wrapper.find("GameItem");
    const warning = wrapper.find("h3");
    const wrapperLeagueName = wrapper.find("#leagueName");

    expect(gameItem.length).toBe(2);
    expect(warning).toBeUndefined;
    expect(wrapperLeagueName.text()).toBe(leagueName);
  });
});
