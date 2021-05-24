const express = require("express");
const cors = require("cors");
const app = express();
const MongoClient = require("mongodb").MongoClient;
const ObjectId = require("mongodb").ObjectID;
const constants = require("./constants");
const { response } = require("express");
app.use(cors());

require("dotenv").config({
  path: "../../.env",
});

let homeBack, awayBack;

function databaseExist(databaseName) {
  return new Promise(async (resolve, reject) => {
    const databaseUrl = `mongodb://${process.env.MONGO_IP}/${databaseName}`;
    //const databaseUrl = `mongodb://localhost:27017/${databaseName}`;

    try {
      const connection = await MongoClient.connect(databaseUrl, {
        connectTimeoutMS: 500,
        useNewUrlParser: true,
      });

      const admin = connection.db().admin();

      const listFilter = {
        nameOnly: true,
        filter: {
          name: databaseName,
        },
      };

      const databaseList = await admin.listDatabases(listFilter);
      const databaseListSize = databaseList.databases.length;
      databaseListSize > 0 ? resolve(true) : resolve(false);
    } catch (error) {
      console.log("error =>  databaseName " + error);
      reject("error");
    }
  });
}

function connectDatabase(databaseName) {
  return new Promise(async (resolve, reject) => {
    try {
      const isDatabase = await databaseExist(databaseName);
      if (isDatabase) {
        const databaseUrl = `mongodb://${process.env.MONGO_IP}/${databaseName}`;
        //const databaseUrl = `mongodb://localhost:27017/${databaseName}`;

        const connection = await MongoClient.connect(databaseUrl, {
          useNewUrlParser: true,
        });
        const database = connection.db();
        resolve(database);
      } else {
        throw new Error(
          "Required database does not exist ! Please check your database name"
        );
      }
    } catch (error) {
      console.log(error);
      reject(error);
    }
  });
}

function getData(collectionName, aggregation) {
  return new Promise(async (resolve, reject) => {
    try {
      const database = await connectDatabase(process.env.MONGO_DATABASE);

      const result = await database
        .collection(collectionName)
        .aggregate(aggregation, {
          allowDiskUse: true,
        })
        .toArray();

      if (result.length > 0) {
        resolve(result);
      } else {
        resolve([]);
      }
    } catch (error) {
      reject(error);
    }
  });
}

function getTeamPositionData(teamName) {
  return new Promise(async (resolve, reject) => {
    try {
      const clubMatch = {
        clubName: teamName,
      };
      const lookup = {
        from: "players",
        localField: "clubName",
        foreignField: "club",
        as: "players",
      };

      const unwindPlayers = {
        path: "$players",
      };

      const yearMatch = {
        "players.year": 2021,
      };

      const addFields = {
        positions: {
          $split: ["$players.player_positions", ","],
        },
      };

      const unwindPositions = {
        path: "$positions",
      };

      const sort = {
        "players.overall": -1,
      };

      const group = {
        _id: {
          $trim: {
            input: "$positions",
          },
        },
        players: {
          $push: "$players",
        },
        bestPlayer: {
          $first: "$players",
        },
        bestOverall: {
          $first: "$players.overall",
        },
        averageOverall: {
          $avg: "$players.overall",
        },
      };
      const positions = [
        ["GK"],
        ["LB", "LCB", "CB", "RCB", "RB"],
        ["LWB", "LDM", "CDM", "RDM", "RWB"],
        ["LM", "LCM", "CM", "RCM", "RM"],
        ["LAM", "CAM", "RAM"],
        ["LW", "LF", "CF", "RF", "RW"],
        ["LS", "ST", "RS"],
      ];

      const projection = {
        _id: 1,
        "players._id": 1,
        "players.short_name": 1,
        "players.overall": 1,
        "players.imageUrl": 1,

        "bestPlayer._id": 1,
        "bestPlayer.short_name": 1,
        "bestPlayer.overall": 1,
        "bestPlayer.imageUrl": 1,
        bestOverall: {
          $round: ["$bestOverall", 0],
        },
        averageOverall: {
          $round: ["$averageOverall", 0],
        },
      };

      let aggregationList = [];
      positions.map((currentPosition) => {
        const currentPositionMatch = {
          _id: {
            $in: currentPosition,
          },
        };
        const aggregation = [
          { $match: clubMatch },
          { $lookup: lookup },
          { $unwind: unwindPlayers },
          { $match: yearMatch },
          { $addFields: addFields },
          { $unwind: unwindPositions },
          // { $sort: sort },
          { $group: group },
          { $project: projection },
          { $match: currentPositionMatch },
        ];
        aggregationList.push(aggregation);
      });

      const collectionName = "teams";

      let requests = aggregationList.map((currentAggregation) =>
        getData(collectionName, currentAggregation)
      );
      //const result = await getData(collectionName, aggregation);
      const results = Promise.all(requests);

      resolve(results);
    } catch (error) {
      reject(error.message);
    }
  });
}

function getTeamData(teamName) {
  return new Promise(async (resolve, reject) => {
    try {
      const clubMatch = {
        clubName: teamName,
      };
      const lookup = {
        from: "players",
        localField: "clubName",
        foreignField: "club",
        as: "players",
      };

      const unwindPlayers = {
        path: "$players",
      };

      const yearMatch = {
        "players.year": 2021,
      };
      const addFields = {
        positions: {
          $split: ["$players.player_positions", ","],
        },
      };

      const unwind = {
        path: "$positions",
      };

      const datas = [
        constants.generalData,
        constants.attackingData,
        constants.skillData,
        constants.movementData,
        constants.powerData,
        constants.mentalityData,
        constants.defendingData,
        constants.gkData,
      ];
      const group = {};
      let groups = [];
      let labels = [];

      datas.map((currentData) => {
        let currentGroup = {};
        labels.push(currentData.label);
        currentData.fields.map((currentField, index) => {
          const currentLabel = currentData.labels[index];
          currentGroup[currentLabel] = {
            $avg: `$players.${currentField}`,
          };
          currentGroup["_id"] = "$_id";
        });
        groups.push(currentGroup);
      });

      let aggregationList = [];

      groups.map((currentGroup, index) => {
        const fields = Object.keys(currentGroup);
        let projection = {};
        const currentLabel = labels[index];
        let labelProjections = fields.map((currentField) => "$" + currentField);

        fields.map((currentField) => {
          projection[currentField] = {
            $round: [`$${currentField}`, 0],
          };
          projection["_id"] = 0;
        });

        // projection[currentLabel] = {
        //   $round: {
        //     $avg: labelProjections,
        //   },
        // };
        let positionMatch = {};

        if (constants.positions[currentLabel] != null) {
          positionMatch["positions"] = {
            $in: constants.positions[currentLabel],
          };
        } else {
          positionMatch["positions"] = {
            $in: constants.positions["General"],
          };
        }

        const aggregation = [
          { $match: clubMatch },
          { $lookup: lookup },
          { $unwind: unwindPlayers },
          { $match: yearMatch },
          { $addFields: addFields },
          { $unwind: unwind },
          { $match: positionMatch },
          { $group: currentGroup },
          { $project: projection },
        ];
        aggregationList.push(aggregation);
      });

      const collectionName = "teams";

      let requests = aggregationList.map((currentAggregation) =>
        getData(collectionName, currentAggregation)
      );
      const transCoef = 0.5;
      const results = await Promise.all(requests);
      let allData = [];

      try {
        results.map((currentResult, index) => {
          const currentData = datas[index];
          const chartData = {
            labels: currentData.labels,
            datasets: [
              {
                label: teamName,
                data: Object.values(currentResult[0]),
              },
            ],
          };
          const type = "radar";
          const chartInfo = {
            data: chartData,
            type: type,
          };
          allData.push(chartInfo);
        });
      } catch (error) {
        console.log("error");
      }

      resolve(allData);
    } catch (error) {
      reject(error);
    }
  });
}

function getTeamStackData(teamName) {
  return new Promise(async (resolve, reject) => {
    try {
      const clubMatch = {
        clubName: teamName,
      };
      const lookup = {
        from: "players",
        localField: "clubName",
        foreignField: "club",
        as: "players",
      };

      const unwindPlayers = {
        path: "$players",
      };

      const yearMatch = {
        "players.year": 2021,
      };

      const addFields = {
        positions: {
          $split: ["$players.player_positions", ","],
        },
      };

      const unwind = {
        path: "$positions",
      };

      const datas = [
        constants.generalData,
        constants.attackingData,
        constants.skillData,
        constants.movementData,
        constants.powerData,
        constants.mentalityData,
        constants.defendingData,
        constants.gkData,
      ];
      const group = {};
      let groups = [];
      let labels = [];
      let aggregationList = [];

      datas.map((currentData) => {
        let currentGroup = {};
        labels.push(currentData.label);
        currentData.fields.map((currentField, index) => {
          const currentLabel = currentData.labels[index];
          currentGroup[currentLabel] = {
            $avg: `$players.${currentField}`,
          };
          currentGroup["_id"] = "$_id";
        });
        groups.push(currentGroup);
      });

      groups.map((currentGroup, index) => {
        const fields = Object.keys(currentGroup);
        let projection = {};
        const currentLabel = labels[index];
        let labelProjections = fields
          .filter(function (currentField) {
            if (currentField == "_id") {
              return false; // skip
            }
            return true;
          })
          .map((currentField) => "$" + currentField);

        projection[currentLabel] = {
          $round: {
            $avg: labelProjections,
          },
        };

        projection["_id"] = 0;

        let positionMatch = {};

        if (constants.positions[currentLabel] != null) {
          positionMatch["positions"] = {
            $in: constants.positions[currentLabel],
          };
        } else {
          positionMatch["positions"] = {
            $in: constants.positions["General"],
          };
        }

        const aggregation = [
          { $match: clubMatch },
          { $lookup: lookup },
          { $unwind: unwindPlayers },
          { $match: yearMatch },
          { $addFields: addFields },
          { $unwind: unwind },
          { $match: positionMatch },
          { $group: currentGroup },
          { $project: projection },
        ];
        aggregationList.push(aggregation);
      });

      const collectionName = "teams";

      let requests = aggregationList.map((currentAggregation) =>
        getData(collectionName, currentAggregation)
      );
      const results = await Promise.all(requests);

      let allData = [];
      try {
        results.map((currentResult, index) => {
          const currentData = datas[index];
          const chartData = {
            labels: [currentData.label],
            datasets: [
              {
                label: teamName,
                data: Object.values(currentResult[0]),
              },
            ],
          };
          const type = "bar";
          const chartInfo = {
            data: chartData,
            type: type,
          };
          allData.push(chartInfo);
        });
      } catch (error) {
        console.log(error);
      }

      resolve(allData);
    } catch (error) {
      reject(error);
    }
  });
}

function createChartData(homeData, awayData) {
  return new Promise((resolve, reject) => {
    try {
      homeData.map((currentHome, index) => {
        currentHome.data.datasets.push(awayData[index].data.datasets[0]);
        currentHome.data.datasets[0]["backgroundColor"] = homeBack;
        awayData[index].data.datasets[0]["backgroundColor"] = awayBack;
      });
      resolve(homeData);
    } catch (error) {
      reject(error);
    }
  });
}

function getTeamPlayers(teamName) {
  return new Promise(async (resolve, reject) => {
    try {
      const clubMatch = {
        clubName: teamName,
      };
      const lookup = {
        from: "players",
        localField: "clubName",
        foreignField: "club",
        as: "players",
      };

      const unwindPlayers = {
        path: "$players",
      };

      const yearMatch = {
        "players.year": 2021,
      };

      const sort = {
        "players.overall": -1,
      };

      const group = {
        _id: null,
        players: {
          $push: "$players",
        },
      };
      const project = {
        _id: 1,
        "players._id": 1,
        "players.short_name": 1,
        "players.overall": 1,
        "players.imageUrl": 1,
      };
      const aggregation = [
        { $match: clubMatch },
        { $lookup: lookup },
        { $unwind: unwindPlayers },
        { $match: yearMatch },
        { $sort: sort },
        { $group: group },
        { $project: project },
      ];

      const result = await getData("teams", aggregation);
      resolve(result);
    } catch (error) {
      reject("Get Team" + error);
    }
  });
}
app.get("/compareTeams", async (req, res) => {
  try {
    const homeTeam = req.query.homeTeam;
    const awayTeam = req.query.awayTeam;

    if (homeTeam == undefined || awayTeam == undefined) {
      throw "Error";
    }
    const transCoef = 0.5;

    homeBack = `rgba(${Math.floor(Math.random() * 255)},${Math.floor(
      Math.random() * 255
    )},${Math.floor(Math.random() * 255)},${transCoef})`;

    awayBack = `rgba(${Math.floor(Math.random() * 255)},${Math.floor(
      Math.random() * 255
    )},${Math.floor(Math.random() * 255)},${transCoef})`;

    const [
      homeTeamPlayerData,
      awayTeamPlayerData,
      homeTeamData,
      awayTeamData,
      homeTeamStack,
      awayTeamStack,
      homeTeamPlayers,
      awayTeamPlayers,
    ] = await Promise.all([
      getTeamPositionData(homeTeam),
      getTeamPositionData(awayTeam),
      getTeamData(homeTeam),
      getTeamData(awayTeam),
      getTeamStackData(homeTeam),
      getTeamStackData(awayTeam),
      getTeamPlayers(homeTeam),
      getTeamPlayers(awayTeam),
    ]);

    const radarData = await createChartData(homeTeamData, awayTeamData);
    const stackData = await createChartData(homeTeamStack, awayTeamStack);
    const response = {
      radarData: radarData,
      stackData: stackData,
      homeTeamPlayerData: homeTeamPlayerData,
      awayTeamPlayerData: awayTeamPlayerData,
      homeTeamPlayers: homeTeamPlayers,
      awayTeamPlayers: awayTeamPlayers,
    };

    // const asd = await getTeamPositionData(homeTeam);
    res.status(200).send(response);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

module.exports = {
  app: app,
  databaseExist: databaseExist,
  connectDatabase: connectDatabase,
  getData: getData,
  getTeamPositionData: getTeamPositionData,
  getTeamData: getTeamData,
  getTeamStackData: getTeamStackData,
  createChartData: createChartData,
  getTeamPlayers: getTeamPlayers,
};
