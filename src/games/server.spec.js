const server = require("./server");
const supertest = require("supertest");
const request = supertest(server.app);
require("dotenv").config();

describe("API-FOOTBALL Functions Test", () => {
  it("should return wrong fixture id error", async () => {
    const id = "587405";
    try {
      await server.getFixtureByID(id);
    } catch (error) {
      expect(error).toBe("Not Found");
    }
  });

  it("should succesfully find the fixture with correct id", async () => {
    const id = "157201";
    const expectedResponse = {
      gameID: 157201,
      homeTeam: {
        team_id: 33,
        team_name: "Manchester United",
        logo: "https://media.api-sports.io/football/teams/33.png",
      },
      awayTeam: {
        team_id: 34,
        team_name: "Newcastle",
        logo: "https://media.api-sports.io/football/teams/34.png",
      },
      startTime: "20:30",
    };

    expect.assertions(1);
    await expect(server.getFixtureByID(id)).resolves.toMatchObject(
      expectedResponse
    );
  });

  it("should get get fixtures by league id ", async () => {
    const leagueID = "1";
    await expect(server.getFixtureByLeague).resolves;
  });
});

describe("API-FOOTBALL Api Testing", () => {
  it("should get 404 for not found fixture", async (done) => {
    const id = "xyz";
    expect((await request.get(`/getFixtureByID/${id}`)).status).toEqual(404);
    done();
  });

  it("should get 200 for  found fixture", async (done) => {
    const id = "157201";
    expect((await request.get(`/getFixtureByID/${id}`)).status).toEqual(200);
    done();
  });
});
