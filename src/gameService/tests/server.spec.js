const server = require("../server");
const supertest = require("supertest");
const request = supertest(server.app);
const { MongoClient } = require("mongodb");
require("dotenv").config();
const ObjectId = require("mongodb").ObjectID;
const sampleResponses = require("./sampleResponses.json");
const samplePlayers = require("./samplePlayer.json");
const sampleTeams = require("./sampleTeams.json");
beforeAll(async () => {
  const mongoUrl = process.env.MONGO_URL;

  const splittedUrl = mongoUrl.split("/");
  const mongoIp = splittedUrl[splittedUrl.length - 2];

  process.env.MONGO_IP = mongoIp;
  //process.env.MONGO_DATABASE = "fifa";

  const connection = await MongoClient.connect(mongoUrl, {
    useNewUrlParser: true,
  });

  const database = connection.db();
  const players = database.collection("players");
  const teams = database.collection("teams");
  samplePlayers.map((player) => {
    player._id = ObjectId(player._id);
  });
  sampleTeams.map((team) => {
    team._id = ObjectId(team._id);
  });

  await players.insert(samplePlayers);
  await teams.insert(sampleTeams);
});
afterAll(async (done) => {
  done();
});

describe("Game Service Testing", () => {
  it("Test database connection", async () => {
    const existDatabaseName = process.env.MONGO_DATABASE;
    await expect(
      server.connectDatabase(existDatabaseName)
    ).resolves.not.toBeNull();
  });
  it("Test get data", async () => {
    const collectionName = "teams";
    const aggregation = [{ $match: {} }];

    await expect(
      server.getData(collectionName, aggregation)
    ).resolves.toBeTruthy();
  });

  it("Test Getting Fixtures", async () => {
    const fromDate = "2021-05-08";
    const toDate = "2021-05-08";

    await expect(server.getFixtures(fromDate, toDate)).resolves.toBeTruthy();
  });

  it("Test Getting Fixtures API", async () => {
    const fromDate = "2021-05-08";
    const toDate = "2021-05-08";

    const getFixtures = await request.get(`/getFixtures`).query({
      fromDate: fromDate,
      toDate: toDate,
    });
    expect(getFixtures.status).toEqual(200);
  });
});
