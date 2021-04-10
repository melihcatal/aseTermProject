const server = require("../server");
const supertest = require("supertest");
const e = require("express");
const { MongoClient } = require("mongodb");
const request = supertest(server.app);
require("dotenv").config();

describe("Test sets for database service", () => {
  beforeAll(async () => {
    const mongoUrl = process.env.MONGO_URL;
    const splittedUrl = mongoUrl.split("/");
    const mongoIp = splittedUrl[splittedUrl.length - 2];
    process.env.MONGO_IP = mongoIp;

    const connection = await MongoClient.connect(mongoUrl, {
      useNewUrlParser: true,
    });

    const database = connection.db();
    const users = database.collection("users");
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

  it("Test database existance ", async () => {
    const existCase = "fifa";

    const absentCase = "absent";

    await expect(server.databaseExist(existCase)).resolves.toBe(true);

    await expect(server.databaseExist(absentCase)).resolves.toBe(false);
  });

  it("Test database connection", async () => {
    const existDatabaseName = "fifa";
    const absentDatabaseName = "absent";
    await expect(
      server.connectDatabase(existDatabaseName)
    ).resolves.not.toBeNull();
    await expect(
      server.connectDatabase(absentDatabaseName)
    ).rejects.toThrowError();
  });

  it("Test getting data from database with desired features", async () => {
    const existCollection = "users";
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
      server.getData(existCollection, "age", -1, 0)
    ).resolves.toMatchObject(user);
    await expect(
      server.getData(notExistCollection, "age", -1, 0)
    ).rejects.toContain("Not Found");

    await expect(
      server.connectDatabase(notExistCollection)
    ).rejects.toThrowError();
  });
});
