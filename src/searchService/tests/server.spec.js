const server = require("../server");
const supertest = require("supertest");
const e = require("express");
const { MongoClient } = require("mongodb");
const request = supertest(server.app);
const sampleUser = require("./sampleUser.json");
require("dotenv").config();
const ObjectId = require("mongodb").ObjectID;

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
  const users = database.collection("players");
  sampleUser._id = ObjectId(sampleUser._id);
  await users.insertOne(sampleUser);
});

afterAll(async (done) => {
  done();
});

describe("Database Functions Testing", () => {
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

  it("Test getting data from database with desired features", async (done) => {
    const existCollection = "players";
    const notExistCollection = "weather";

    await expect(
      server.getData(existCollection, "age", -1, 0, {})
    ).resolves.toMatchObject([sampleUser]);
    await expect(
      server.getData(notExistCollection, "age", -1, 0, {})
    ).resolves.toContain("Not Found");

    await expect(
      server.connectDatabase(notExistCollection)
    ).rejects.toThrowError();

    done();
  });
});

describe("Database Api Testing", () => {
  it("Search Data", async () => {
    const fullName = sampleUser.long_name;
    const partialName = "Me";
    const partialNameSurName = "L Me";
    const absentPlayerName = "Simge";

    expect((await request.get(`/searchPlayer/${fullName}`)).status).toEqual(
      200
    );
    expect((await request.get(`/searchPlayer/${partialName}`)).status).toEqual(
      200
    );
    expect(
      (await request.get(`/searchPlayer/${partialNameSurName}`)).status
    ).toEqual(200);

    expect(
      (await request.get(`/searchPlayer/${absentPlayerName}`)).status
    ).toEqual(404);
  });
});
