const server = require("../server");
const supertest = require("supertest");
const { MongoClient } = require("mongodb");
const request = supertest(server.app);
const samplePlayers = require("./samplePlayer.json");
const sampleTeams = require("./sampleTeams.json");
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

describe("Compare Teams Functions Testing", () => {
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

  it("Test Get Team Position Data", async () => {
    const teamName = "Trabzonspor";
    const collectionName = "teams";
    const expectedResult = [
      [
        {
          _id: "GK",
          averageOverall: 77,
          bestOverall: 77,
          bestPlayer: {
            _id: "60a79aca6b148a03fb95c4bd",
            imageUrl:
              "https://asefifaplayers.s3.eu-central-1.amazonaws.com/players21/226300.png",
            overall: 77,
            short_name: "U. Çakır",
          },
          players: [
            {
              _id: "60a79aca6b148a03fb95c4bd",
              imageUrl:
                "https://asefifaplayers.s3.eu-central-1.amazonaws.com/players21/226300.png",
              overall: 77,
              short_name: "U. Çakır",
            },
          ],
        },
      ],
      [],
      [],
      [],
      [],
      [],
      [
        {
          _id: "ST",
          averageOverall: 77,
          bestOverall: 77,
          bestPlayer: {
            _id: "60a79aca6b148a03fb95c4b9",
            imageUrl:
              "https://asefifaplayers.s3.eu-central-1.amazonaws.com/players21/216549.png",
            overall: 77,
            short_name: "A. Sørloth",
          },
          players: [
            {
              _id: "60a79aca6b148a03fb95c4b9",
              imageUrl:
                "https://asefifaplayers.s3.eu-central-1.amazonaws.com/players21/216549.png",
              overall: 77,
              short_name: "A. Sørloth",
            },
          ],
        },
      ],
    ];
    await expect(server.getTeamPositionData(teamName)).resolves.toBeTruthy();
  });

  it("Test Get Team Stack Chart Data", async () => {
    const teamName = "Trabzonspor";
    const expectedResponse = [
      {
        data: {
          datasets: [{ data: [68], label: "Trabzonspor" }],
          labels: ["General"],
        },
        type: "bar",
      },
      {
        data: {
          datasets: [{ data: [72], label: "Trabzonspor" }],
          labels: ["Attacking"],
        },
        type: "bar",
      },
      {
        data: {
          datasets: [{ data: [44], label: "Trabzonspor" }],
          labels: ["Skill"],
        },
        type: "bar",
      },
      {
        data: {
          datasets: [{ data: [63], label: "Trabzonspor" }],
          labels: ["Movement"],
        },
        type: "bar",
      },
      {
        data: {
          datasets: [{ data: [64], label: "Trabzonspor" }],
          labels: ["Power"],
        },
        type: "bar",
      },
      {
        data: {
          datasets: [{ data: [46], label: "Trabzonspor" }],
          labels: ["Mentality"],
        },
        type: "bar",
      },
    ];
    await expect(server.getTeamStackData(teamName)).resolves.toStrictEqual(
      expectedResponse
    );
  });

  it("Test get Team Data", async () => {
    const teamName = "Trabzonspor";
    const expectedResponse = [
      {
        data: {
          datasets: [{ data: [75, 77, 66, 70, 36, 83], label: "Trabzonspor" }],
          labels: [
            "Pace",
            "Shooting",
            "Passing",
            "Dribbling",
            "Defending",
            "Physic",
          ],
        },
        type: "radar",
      },
      {
        data: {
          datasets: [{ data: [66, 81, 79, 67, 69], label: "Trabzonspor" }],
          labels: [
            "Crossing",
            "Finishing",
            "Heading",
            "Short Passing",
            "Volleys",
          ],
        },
        type: "radar",
      },
      {
        data: {
          datasets: [{ data: [42, 46, 40, 43, 50], label: "Trabzonspor" }],
          labels: [
            "Dribbling",
            "Curve",
            "FK Accuracy",
            "Long Passing",
            "Ball Control",
          ],
        },
        type: "radar",
      },
      {
        data: {
          datasets: [{ data: [62, 67, 52, 76, 57], label: "Trabzonspor" }],
          labels: ["Acceleration", "Sprint", "Agility", "Reactions", "Balance"],
        },
        type: "radar",
      },
      {
        data: {
          datasets: [{ data: [68, 70, 62, 78, 44], label: "Trabzonspor" }],
          labels: [
            "Shot Power",
            "Jumping",
            "Stamina",
            "Strength",
            "Long Shots",
          ],
        },
        type: "radar",
      },
      {
        data: {
          datasets: [{ data: [50, 30, 46, 56, 46], label: "Trabzonspor" }],
          labels: [
            "Aggression",
            "Interceptions",
            "Positioning",
            "Vision",
            "Penalties",
          ],
        },
        type: "radar",
      },
    ];
    await expect(server.getTeamData(teamName)).resolves.toStrictEqual(
      expectedResponse
    );
  });

  it("Test get data", async () => {
    const collectionName = "teams";
    const aggregation = [{ $match: {} }];
    const expectedResponse = [
      {
        _id: "60a0f8c72f6bf50887fa3363",
        clubLogo:
          "https://asefifaplayers.s3.eu-central-1.amazonaws.com/clubLogo/Liverpool.png",
        clubName: "Liverpool",
        countryFlag:
          "https://asefifaplayers.s3.eu-central-1.amazonaws.com/countryFlags/England.png",
        countryName: "England",
        leagueName: "English Premier League",
      },
      {
        _id: "60a0f8c72f6bf50887fa3438",
        clubLogo:
          "https://asefifaplayers.s3.eu-central-1.amazonaws.com/clubLogo/Trabzonspor.png",
        clubName: "Trabzonspor",
        countryFlag:
          "https://asefifaplayers.s3.eu-central-1.amazonaws.com/countryFlags/Turkey.png",
        countryName: "Turkey",
        leagueName: "Turkish Süper Lig",
      },
    ];
    await expect(
      server.getData(collectionName, aggregation)
    ).resolves.toBeTruthy();
  });

  it("Test compare teams api ", async () => {
    const compareTeams = await request.get(`/compareTeams`).query({
      homeTeam: "Trabzonspor",
      awayTeam: "Liverpool",
    });
    expect(compareTeams.status).toEqual(200);
  });
});
