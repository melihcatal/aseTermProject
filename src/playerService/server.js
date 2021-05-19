const express = require("express");
const cors = require("cors");
const axios = require("axios");
const MongoClient = require("mongodb").MongoClient;
const ObjectId = require("mongodb").ObjectID;
const constansts = require("./constants");
const app = express();
app.use(cors());

require("dotenv").config({
  path: "../../.env",
});

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

function getData(
  collectionName,
  sortField,
  sortBy,
  limit,
  condition,
  projection = null,
  group = null
) {
  return new Promise(async (resolve, reject) => {
    try {
      const database = await connectDatabase(process.env.MONGO_DATABASE);

      const aggregation = [
        { $match: condition },
        ...(group ? [{ $group: group }] : []),
        ...(projection ? [{ $project: projection }] : []),
        { $sort: { [sortField]: sortBy } },
        ...(limit ? [{ $limit: limit }] : []),
      ];

      const result = await database
        .collection(collectionName)
        .aggregate(aggregation, {
          allowDiskUse: true,
        })
        .toArray();

      if (result.length > 0) {
        resolve(result);
      } else {
        resolve("Not Found");
      }
    } catch (error) {
      reject(error);
    }
  });
}

function getPositionInfo(id) {
  return new Promise((resolve, reject) => {
    try {
      const collectionName = "players";
      const sortField = "_id";
      const sortBy = -1;
      const condition = {
        _id: ObjectId(id),
      };

      const positions = [
        ["gk"],
        ["lb", "lcb", "cb", "rcb", "rb"],
        ["lwb", "ldm", "cdm", "rdm", "rwb"],
        ["lm", "lcm", "cm", "rcm", "rm"],
        ["lam", "cam", "ram"],
        ["lw", "lf", "cr", "rf", "rw"],
        ["ls", "st", "rs"],
      ];
      let projections = [];

      positions.map((currentPositions) => {
        let currentProjection = {};
        currentPositions.map((currentPosition) => {
          currentPosition == "gk"
            ? (currentProjection[currentPosition] = "$goalkeeping_reflexes")
            : (currentProjection[currentPosition] = 1);
          currentProjection["_id"] = 0;
        });
        projections.push(currentProjection);
      });

      // map every url to the promise of the fetch
      let requests = projections.map((currentProjection) =>
        getData(
          collectionName,
          sortField,
          sortBy,
          1,
          condition,
          currentProjection
        )
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
      const collectionName = "players";
      const sortField = "_id";
      const sortBy = -1;

      const datas = [
        constansts.generalData,
        constansts.attackingData,
        constansts.skillData,
        constansts.movementData,
        constansts.powerData,
        constansts.mentalityData,
        constansts.defendingData,
        constansts.gkData,
      ];
      const condition = {
        _id: ObjectId(id),
      };

      let projections = [];
      datas.map((currentData) => {
        let currentProjection = {};
        currentData.fields.map((currentField) => {
          currentProjection[currentField] = 1;
          currentProjection["_id"] = 0;
        });
        projections.push(currentProjection);
      });

      let requests = projections.map((currentProjection) =>
        getData(
          collectionName,
          sortField,
          sortBy,
          1,
          condition,
          currentProjection
        )
      );
      const transCoef = 0.5;
      const results = await Promise.all(requests);
      let allData = [];
      results.map((currentResult, index) => {
        const currentData = datas[index];
        const chartData = {
          labels: currentData.labels,
          datasets: [
            {
              label: currentData.label,
              data: Object.values(currentResult[0]),
              backgroundColor: `rgba(${Math.floor(
                Math.random() * 255
              )},${Math.floor(Math.random() * 255)},${Math.floor(
                Math.random() * 255
              )},${transCoef})`,
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

function getHistoricalData(id) {
  return new Promise(async (resolve, reject) => {
    try {
      const collectionName = "players";
      const sortField = "_id";
      const sortBy = -1;

      const playerInfo = await getDataByID(collectionName, id);
      const sofifaID = playerInfo.sofifa_id;

      const datas = [
        constansts.generalData,
        constansts.attackingData,
        constansts.skillData,
        constansts.movementData,
        constansts.powerData,
        constansts.mentalityData,
        constansts.defendingData,
        constansts.gkData,
      ];
      const condition = {
        sofifa_id: sofifaID,
      };

      let groups = [];

      datas.map((currentData) => {
        let currentGroup = {};
        currentData.fields.map((currentField, index) => {
          currentGroup[currentData.labels[index]] = {
            $push: `$${currentField}`,
          };
          currentGroup["years"] = {
            $push: `$year`,
          };
          currentGroup["_id"] = "$sofifa_id";
        });
        groups.push(currentGroup);
      });

      let requests = groups.map((currentGroup) =>
        getData(
          collectionName,
          sortField,
          sortBy,
          0,
          condition,
          { _id: 0 },
          currentGroup
        )
      );
      const transCoef = 0.5;
      const results = await Promise.all(requests);

      let allData = [];
      results.map((currentResult) => {
        let chartData = {};
        let tempDatasets = [];
        currentResult.map((currentItem) => {
          chartData["labels"] = currentItem.years;

          delete currentItem.years;

          for (const [key, value] of Object.entries(currentItem)) {
            const tempData = {
              label: key,
              data: value,
              backgroundColor: `rgba(${Math.floor(
                Math.random() * 255
              )},${Math.floor(Math.random() * 255)},${Math.floor(
                Math.random() * 255
              )},${transCoef})`,
            };
            tempDatasets.push(tempData);
          }
        });
        chartData["datasets"] = tempDatasets;

        const type = "line";
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

function getChartData(id) {
  return new Promise(async (resolve, reject) => {
    try {
      const radarData = await getRadarData(id);
      const historicalData = await getHistoricalData(id);

      const response = {
        radarData: radarData,
        historicalData: historicalData,
      };

      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
}

app.get("/getPlayer/:id", async (req, res) => {
  try {
    const collectionName = "players";
    const id = req.params.id;
    const result = await getDataByID(collectionName, id);
    if (result != "Not Found") {
      const playerData = {
        age: result.age,
        club: result.club,
        overall: result.overall,
        value: result.value_eur,
        position: result.player_positions,
        preferredFoot: result.preferred_foot,
        workRate: result.work_rate,
        bodyType: result.body_type,
      };
      const playerInfo = {
        name: result.long_name,
        nationality: result.nationality,
        imageUrl: result.imageUrl,
      };
      const chartData = await getChartData(id);
      const positionInfo = await getPositionInfo(id);
      const response = {
        playerData: playerData,
        playerInfo: playerInfo,
        chartData: chartData,
        positionInfo: positionInfo,
      };

      res.status(200).send(response);
    } else {
      res.status(404).send("Not Found");
    }
  } catch (error) {
    res.status(500).send("Error");
  }
});

module.exports = {
  app: app,
  databaseExist: databaseExist,
  connectDatabase: connectDatabase,
  getDataByID: getDataByID,
  getChartData: getChartData,
  getRadarData: getRadarData,
  getHistoricalData: getHistoricalData,
};
