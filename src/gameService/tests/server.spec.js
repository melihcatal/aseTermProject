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
  it("Test database existance ", async () => {
    const existCase = process.env.MONGO_DATABASE;

    const absentCase = "absent";

    await expect(server.databaseExist(existCase)).resolves.toBe(true);

    await expect(server.databaseExist(absentCase)).resolves.toBe(false);
  });
  it("Test database connection", async () => {
    const existDatabaseName = process.env.MONGO_DATABASE;
    const absentDatabaseName = "absent";
    await expect(
      server.connectDatabase(existDatabaseName)
    ).resolves.not.toBeNull();
    await expect(
      server.connectDatabase(absentDatabaseName)
    ).rejects.toThrowError();
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
