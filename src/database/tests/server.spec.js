const server = require("../server");
const supertest = require("supertest");
const e = require("express");
const { MongoClient } = require("mongodb");
const request = supertest(server.app);
require("dotenv").config();

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
  const user = {
    _id: -1,
    name: "Melih Catal",
    age: 25,
    hobbies: ["coding", "sleeping"],
  };
  await users.insertOne(user);
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
    const user = [
      {
        _id: -1,
        name: "Melih Catal",
        age: 25,
        hobbies: ["coding", "sleeping"],
      },
    ];
    await expect(
      server.getData(existCollection, "age", -1, 0, {})
    ).resolves.toMatchObject(user);
    await expect(
      server.getData(notExistCollection, "age", -1, 0, {})
    ).resolves.toContain("Not Found");

    await expect(
      server.connectDatabase(notExistCollection)
    ).rejects.toThrowError();

    done();
  });

  it("Test getting data by ID", async () => {
    const existUserID = -1;
    const absentUserID = 7;
    const collectionName = "players";
    const user = [
      {
        _id: -1,
        name: "Melih Catal",
        age: 25,
        hobbies: ["coding", "sleeping"],
      },
    ];

    await expect(
      server.getDataByID(collectionName, existUserID)
    ).resolves.toMatchObject(user);

    await expect(
      server.getDataByID(collectionName, absentUserID)
    ).resolves.toContain("Not Found");
  });
});

describe("Database Api Testing", () => {
  it("Search Data", async () => {
    const fullName = "Melih Catal";
    const partialName = "Me";
    const partialNameSurName = "Me Ca";
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

  it("Get Data By ID", async () => {
    const existUserID = -1;
    const absentUserID = 7;
    const user = [
      {
        _id: -1,
        name: "Melih Catal",
        age: 25,
        hobbies: ["coding", "sleeping"],
      },
    ];
    const existCall = await request.get(`/getPlayer/${existUserID}`);
    const absentCall = await request.get(`/getPlayer/${absentUserID}`);

    expect(existCall.status).toEqual(200);
    expect(JSON.parse(existCall.text)).toMatchObject(user);

    expect(absentCall.status).toEqual(404);
    expect(absentCall.text).toContain("Not Found");
  });
});
