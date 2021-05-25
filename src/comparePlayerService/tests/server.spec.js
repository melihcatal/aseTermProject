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

describe("Compare Players Functions Testing", () => {
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

  it("Test Get Data", async () => {
    const collectionName = "players";
    const match = {
      _id: ObjectId("60a79aca6b148a03fb95c49c"),
    };
    const aggregation = [
      {
        $match: match,
      },
    ];
    const expectedResult = [
      {
        _id: "60a79aca6b148a03fb95c49c",
        age: 23,
        attacking_crossing: 74,
        attacking_finishing: 75,
        attacking_heading_accuracy: 46,
        attacking_short_passing: 76,
        attacking_volleys: 70,
        body_type: "Lean",
        cam: 76,
        cb: 50,
        cdm: 59,
        cf: 76,
        club: "Liverpool",
        cm: 71,
        contract_valid_until: "2023.0",
        defending: 44,
        defending_sliding_tackle: 42,
        defending_standing_tackle: 48,
        dob: "1997-03-22",
        dribbling: 77,
        goalkeeping_diving: 7,
        goalkeeping_handling: 13,
        goalkeeping_kicking: 9,
        goalkeeping_positioning: 15,
        goalkeeping_reflexes: 7,
        height_cm: 173,
        imageUrl:
          "https://asefifaplayers.s3.eu-central-1.amazonaws.com/players21/220710.png",
        international_reputation: "1",
        joined: "2014-07-05",
        lam: 76,
        lb: 59,
        lcb: 50,
        lcm: 71,
        ldm: 59,
        league_name: "English Premier League",
        league_rank: "1.0",
        lf: 76,
        lm: 76,
        long_name: "Harry Wilson",
        ls: 73,
        lw: 77,
        lwb: 62,
        mentality_aggression: 42,
        mentality_composure: 75,
        mentality_interceptions: 32,
        mentality_penalties: 78,
        mentality_positioning: 78,
        mentality_vision: 75,
        movement_acceleration: 79,
        movement_agility: 79,
        movement_balance: 84,
        movement_reactions: 76,
        movement_sprint_speed: 77,
        nation_jersey_number: "23.0",
        nation_position: "SUB",
        nationality: "Wales",
        overall: 77,
        pace: 78,
        passing: 75,
        physic: 56,
        player_positions: "RM, CM",
        player_traits: "Long Shot Taker (AI), Outside Foot Shot",
        player_url: "https://sofifa.com/player/220710/harry-wilson/210002",
        potential: 83,
        power_jumping: 43,
        power_long_shots: 83,
        power_shot_power: 84,
        power_stamina: 72,
        power_strength: 54,
        preferred_foot: "Left",
        ram: 76,
        rb: 59,
        rcb: 50,
        rcm: 71,
        rdm: 59,
        real_face: "Yes",
        release_clause_eur: "24600000.0",
        rf: 76,
        rm: 76,
        rs: 73,
        rw: 77,
        rwb: 62,
        shooting: 78,
        short_name: "H. Wilson",
        skill_ball_control: 76,
        skill_curve: 86,
        skill_dribbling: 77,
        skill_fk_accuracy: 85,
        skill_long_passing: 67,
        skill_moves: "3",
        sofifa_id: 220710,
        st: 73,
        team_jersey_number: "59.0",
        team_position: "RES",
        value_eur: 12000000,
        wage_eur: 66000,
        weak_foot: "3",
        weight_kg: 70,
        work_rate: "High/Medium",
        year: 2021,
      },
    ];
    await expect(
      server.getData(collectionName, aggregation)
    ).resolves.toBeTruthy();
  });

  it("Test Get Data by ID", async () => {
    const id = "60a79aca6b148a03fb95c49c";
    const collectionName = "players";
    await expect(server.getDataByID(collectionName, id)).resolves.toBeTruthy();
  });

  it("Test Get Historical Data", async () => {
    const homePlayer = "60a79aca6b148a03fb95c49c";
    const awayPlayer = "60a79aca6b148a03fb95c4a8";
    const expectedResponse = [
      {
        data: {
          datasets: [
            { backgroundColor: undefined, data: [77], label: "H. Wilson" },
            { backgroundColor: undefined, data: [77], label: "D. Origi" },
          ],
          labels: [2021],
        },
        options: {
          plugins: {
            legend: { position: "bottom" },
            title: { display: true, text: "Overall" },
          },
        },
        type: "line",
      },
      {
        data: {
          datasets: [
            { backgroundColor: undefined, data: [73], label: "D. Origi" },
            { backgroundColor: undefined, data: [68], label: "H. Wilson" },
          ],
          labels: [2021],
        },
        options: {
          plugins: {
            legend: { position: "bottom" },
            title: { display: true, text: "Attacking" },
          },
        },
        type: "line",
      },
      {
        data: {
          datasets: [
            { backgroundColor: undefined, data: [78], label: "H. Wilson" },
            { backgroundColor: undefined, data: [62], label: "D. Origi" },
          ],
          labels: [2021],
        },
        options: {
          plugins: {
            legend: { position: "bottom" },
            title: { display: true, text: "Skill" },
          },
        },
        type: "line",
      },
      {
        data: {
          datasets: [
            { backgroundColor: undefined, data: [75], label: "D. Origi" },
            { backgroundColor: undefined, data: [79], label: "H. Wilson" },
          ],
          labels: [2021],
        },
        options: {
          plugins: {
            legend: { position: "bottom" },
            title: { display: true, text: "Movement" },
          },
        },
        type: "line",
      },
      {
        data: {
          datasets: [
            { backgroundColor: undefined, data: [75], label: "D. Origi" },
            { backgroundColor: undefined, data: [67], label: "H. Wilson" },
          ],
          labels: [2021],
        },
        options: {
          plugins: {
            legend: { position: "bottom" },
            title: { display: true, text: "Power" },
          },
        },
        type: "line",
      },
      {
        data: {
          datasets: [
            { backgroundColor: undefined, data: [61], label: "H. Wilson" },
            { backgroundColor: undefined, data: [62], label: "D. Origi" },
          ],
          labels: [2021],
        },
        options: {
          plugins: {
            legend: { position: "bottom" },
            title: { display: true, text: "Mentality" },
          },
        },
        type: "line",
      },
      {
        data: {
          datasets: [
            { backgroundColor: undefined, data: [45], label: "H. Wilson" },
            { backgroundColor: undefined, data: [23], label: "D. Origi" },
          ],
          labels: [2021],
        },
        options: {
          plugins: {
            legend: { position: "bottom" },
            title: { display: true, text: "Defending" },
          },
        },
        type: "line",
      },
      {
        data: {
          datasets: [
            { backgroundColor: undefined, data: [10], label: "H. Wilson" },
            { backgroundColor: undefined, data: [14], label: "D. Origi" },
          ],
          labels: [2021],
        },
        options: {
          plugins: {
            legend: { position: "bottom" },
            title: { display: true, text: "GoalKeeping" },
          },
        },
        type: "line",
      },
    ];
    await expect(
      server.getHistoricalData(homePlayer, awayPlayer)
    ).resolves.toBeTruthy();
  });

  it("Test Get Position Info", async () => {
    const id = "60a79aca6b148a03fb95c4a8";
    await expect(server.getPositionInfo(id)).resolves.toBeTruthy();
  });
  it("Test Get Radar Data", async () => {
    const id = "60a79aca6b148a03fb95c4a8";
    await expect(server.getRadarData(id)).resolves.toBeTruthy();
  });

  it("Test getPlayerInfo", async () => {
    const homePlayer = "60a79aca6b148a03fb95c49c";
    const awayPlayer = "60a79aca6b148a03fb95c4a8";
    await expect(
      server.getPlayerInfo(homePlayer, awayPlayer)
    ).resolves.toBeTruthy();
  });
});

describe("Compare Players API Testing", () => {
  it("/comparePlayer test", async () => {
    const comparePlayers = await request.get(`/comparePlayer`).query({
      homePlayer: "60a79aca6b148a03fb95c4a8",
      awayPlayer: "60a79aca6b148a03fb95c4b9",
    });
    expect(comparePlayers.status).toEqual(200);
  });
});
