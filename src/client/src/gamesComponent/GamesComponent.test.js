import GamesComponent from "./GamesComponent";
import { mount, shallow } from "enzyme";
import { MemoryRouter } from "react-router";

test("Games Component Should Render Current Leagues and Games", () => {
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

  const currentLeagues = [leagueInfo, leagueInfo];
  const wrapper = mount(
    <MemoryRouter>
      <GamesComponent leagues={currentLeagues} />
    </MemoryRouter>
  );

  const wrapperLeagues = wrapper.find("LeagueComponent");
  const warning = wrapper.find(".warning");
  expect(wrapperLeagues.length).toBe(2);
  expect(warning).toBeUndefined;
});

test("Games Component Should warn on error ", () => {
  const wrapper = mount(
    <MemoryRouter>
      <GamesComponent leagues={[]} />
    </MemoryRouter>
  );
  const warningMessage = "Error";
  const wrapperLeagues = wrapper.find("LeagueComponent");
  const warning = wrapper.find(".warning");

  expect(wrapperLeagues).toBeUndefined;
  expect(warning.text()).toBe(warningMessage);
});
