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

describe("Player Functions Testing", () => {
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

  it("Test getting data by ID", async () => {
    //  console.log("samlpe >=>" + JSON.stringify(sampleUser, null, 2));
    const existUserID = "608210b8e07e450fd52328dc";
    const absentUserID = 7;
    const collectionName = "players";

    await expect(
      server.getDataByID(collectionName, existUserID)
    ).resolves.toBeTruthy();

    await expect(
      server.getDataByID(collectionName, absentUserID)
    ).resolves.toContain("Not Found");
  });
});

describe("Player Api Testing", () => {
  it("Get Player By ID", async () => {
    const existUserID = "60a0f8e82f6bf50887fa73be";
    const absentUserID = "60a0f8ed2f6bf50887faadc2";

    const existCall = await request.get(`/getPlayer/${existUserID}`);
    const absentCall = await request.get(`/getPlayer/${absentUserID}`);

    expect(existCall.status).toEqual(200);
    expect(JSON.parse(existCall.text)).toBeTruthy();

    // expect(absentCall.status).toEqual(404);
    // expect(absentCall.text).toContain("Not Found");
  });
});
