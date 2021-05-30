const express = require("express");
const cors = require("cors");
const app = express();
const axios = require("axios");
app.use(cors());
const MongoClient = require("mongodb").MongoClient;
const ObjectId = require("mongodb").ObjectID;
const constants = require("./constants");

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
      console.log("error => " + error);
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

function getDataByID(collectionName, id) {
  return new Promise(async (resolve, reject) => {
    try {
      const database = await connectDatabase(process.env.MONGO_DATABASE);
      const condition = {
        _id: ObjectId(id),
      };

      const result = await database
        .collection(collectionName)
        .findOne(condition);
      if (result) {
        resolve(result);
      } else {
        resolve("Not Found");
      }
    } catch (error) {
      console.log("error => " + error);
      reject("Error");
    }
  });
}

function getHistoricalData(homePlayer, awayPlayer) {
  return new Promise(async (resolve, reject) => {
    try {
      const [homeID, awayID] = await Promise.all([
        await getDataByID("players", homePlayer),
        await getDataByID("players", awayPlayer),
      ]);
      const match = {
        sofifa_id: {
          $in: [homeID.sofifa_id, awayID.sofifa_id],
        },
      };
      const sort = {
        year: 1,
      };

      const datas = [
        constants.overallData,
        constants.attackingData,
        constants.skillData,
        constants.movementData,
        constants.powerData,
        constants.mentalityData,
        constants.defendingData,
        constants.gkData,
      ];

      const chartProject = {
        labels: "$year",
        datasets: {
          label: "$name",
          data: "$data",
        },
      };

      const chartGroup = {
        _id: null,
        datasets: {
          $push: "$datasets",
        },
        labels: {
          $max: "$labels",
        },
      };

      const idProject = {
        _id: 0,
      };

      let projectionList = [];
      let labels = [];
      let aggregationList = [];

      datas.map((currentData) => {
        let currentProjection = {};
        const currentLabel = currentData.label;
        labels.push(currentLabel);
        const field = currentData.fields.map(
          (currentField) => "$" + currentField
        );

        currentProjection[currentLabel] = {
          $round: {
            $avg: field,
          },
        };
        currentProjection["year"] = 1;
        currentProjection["sofifa_id"] = 1;
        currentProjection["name"] = "$short_name";
        projectionList.push(currentProjection);
      });

      projectionList.map((project, index) => {
        const currentLabel = labels[index];
        const group = {
          _id: "$sofifa_id",
          data: {
            $push: `$${currentLabel}`,
          },
          year: {
            $push: "$year",
          },
          name: {
            $first: "$name",
          },
        };

        const aggregation = [
          { $match: match },
          { $sort: sort },
          { $project: project },
          { $group: group },
          { $project: chartProject },
          { $group: chartGroup },
          { $project: idProject },
        ];
        aggregationList.push(aggregation);
      });

      const collectionName = "players";

      let requests = aggregationList.map((currentAggregation) =>
        getData(collectionName, currentAggregation)
      );
      const results = await Promise.all(requests);

      let allData = [];
      let asd;
      results.map((currentResult, index) => {
        const title = labels[index];
        currentResult[0].datasets[0].backgroundColor = homeBack;
        currentResult[0].datasets[1].backgroundColor = awayBack;
        asd = currentResult;
        const chartInfo = {
          data: currentResult[0],
          type: "line",
          options: {
            plugins: {
              legend: {
                position: "bottom",
              },
              title: {
                display: true,
                text: title,
              },
            },
          },
        };
        allData.push(chartInfo);
      });

      resolve(allData);
    } catch (error) {
      console.log(error);
      reject(error);
    }
  });
}

function getPositionInfo(id) {
  return new Promise((resolve, reject) => {
    try {
      const collectionName = "players";

      const match = {
        _id: ObjectId(id),
      };

      const positions = [
        ["gk"],
        ["lb", "lcb", "cb", "rcb", "rb"],
        ["lwb", "ldm", "cdm", "rdm", "rwb"],
        ["lm", "lcm", "cm", "rcm", "rm"],
        ["lam", "cam", "ram"],
        ["lw", "lf", "cf", "rf", "rw"],
        ["ls", "st", "rs"],
      ];
      let projections = [];
      let aggregationList = [];
      positions.map((currentPositions) => {
        let currentProjection = {};
        currentPositions.map((currentPosition) => {
          currentPosition == "gk"
            ? (currentProjection[currentPosition] = "$goalkeeping_reflexes")
            : (currentProjection[currentPosition] = 1);
          currentProjection["_id"] = 0;
        });

        const aggregation = [
          {
            $match: match,
          },
          { $project: currentProjection },
        ];
        aggregationList.push(aggregation);
        projections.push(currentProjection);
      });

      // map every url to the promise of the fetch
      let requests = aggregationList.map((currentAggregation) =>
        getData(collectionName, currentAggregation)
      );
      const results = Promise.all(requests);

      resolve(results);
    } catch (error) {
      reject(error);
    }
  });
}

function getRadarData(id) {
  return new Promise(async (resolve, reject) => {
    try {
      const player = await getDataByID("players", id);

      const match = {
        _id: ObjectId(id),
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

      const collectionName = "players";
      let projections = [];
      let aggregationList = [];
      datas.map((currentData) => {
        let currentProjection = {};
        currentData.fields.map((currentField) => {
          currentProjection[currentField] = 1;
          currentProjection["_id"] = 0;
        });

        const aggregation = [
          {
            $match: match,
          },
          { $project: currentProjection },
        ];
        aggregationList.push(aggregation);
        projections.push(currentProjection);
      });

      // map every url to the promise of the fetch
      let requests = aggregationList.map((currentAggregation) =>
        getData(collectionName, currentAggregation)
      );
      const results = await Promise.all(requests);
      let allData = [];
      const transCoef = 0.5;
      results.map((currentResult, index) => {
        const currentData = datas[index];
        const chartData = {
          labels: currentData.labels,
          datasets: [
            {
              label: player.short_name,
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
        currentHome.data.datasets[0]["backgroundColor"] = awayBack;
        awayData[index].data.datasets[0]["backgroundColor"] = homeBack;
      });
      resolve(homeData);
    } catch (error) {
      reject(error);
    }
  });
}

function getPlayerInfo(homePlayer, awayPlayer) {
  return new Promise(async (resolve, reject) => {
    try {
      const match = {
        _id: {
          $in: [ObjectId(homePlayer), ObjectId(awayPlayer)],
        },
      };
      const lookup = {
        from: "teams",
        localField: "club",
        foreignField: "clubName",
        as: "team",
      };
      const unwind = {
        path: "$team",
      };
      const project = {
        overall: 1,
        age: 1,
        club: 1,
        short_name: 1,
        nationality: 1,
        player_positions: 1,
        height_cm: 1,
        weight_kg: 1,
        clubLogo: "$team.clubLogo",
        countryFlag: "$team.countryFlag",
        playerImage: "$imageUrl",
      };

      const aggregation = [
        { $match: match },
        { $lookup: lookup },
        { $unwind: unwind },
        { $project: project },
      ];
      const result = await getData("players", aggregation);
      result[0].backgroundColor = homeBack;
      result[1].backgroundColor = awayBack;
      resolve(result);
    } catch (error) {
      reject(error);
    }
  });
}

app.get("/comparePlayer", async (req, res) => {
  try {
    const homePlayer = req.query.homePlayer;
    const awayPlayer = req.query.awayPlayer;
    const transCoef = 0.3;

    homeBack = `rgba(${Math.floor(Math.random() * 255)},${Math.floor(
      Math.random() * 255
    )},${Math.floor(Math.random() * 255)},${transCoef})`;

    awayBack = `rgba(${Math.floor(Math.random() * 255)},${Math.floor(
      Math.random() * 255
    )},${Math.floor(Math.random() * 255)},${transCoef})`;

    const [
      homePosition,
      awayPosition,
      homeRadar,
      awayRadar,
      playerInfo,
      historicalData,
    ] = await Promise.all([
      getPositionInfo(homePlayer),
      getPositionInfo(awayPlayer),
      getRadarData(homePlayer),
      getRadarData(awayPlayer),
      getPlayerInfo(homePlayer, awayPlayer),
      getHistoricalData(homePlayer, awayPlayer),
    ]);

    const radarData = await createChartData(homeRadar, awayRadar);
    const response = {
      historicalData: historicalData,
      homePosition: homePosition,
      awayPosition: awayPosition,
      radarData: radarData,
      playerInfo: playerInfo,
    };

    res.send(response);
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
  getDataByID: getDataByID,
  getHistoricalData: getHistoricalData,
  getPositionInfo: getPositionInfo,
  getRadarData: getRadarData,
  createChartData: createChartData,
  getPlayerInfo: getPlayerInfo,
};
