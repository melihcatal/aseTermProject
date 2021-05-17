const express = require("express");
const cors = require("cors");
const axios = require("axios");
const MongoClient = require("mongodb").MongoClient;
const ObjectId = require("mongodb").ObjectID;

const app = express();
app.use(cors());

require("dotenv").config({
  path: "../../.env",
});

function databaseExist(databaseName) {
  return new Promise(async (resolve, reject) => {
    // const databaseUrl = `mongodb://${process.env.MONGO_IP}/${databaseName}`;
    const databaseUrl = `mongodb://localhost:27017/${databaseName}`;
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
        // const databaseUrl = `mongodb://${process.env.MONGO_IP}/${databaseName}`;
        const databaseUrl = `mongodb://localhost:27017/${databaseName}`;

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

      console.log("projections => " + JSON.stringify(projections, null, 2));
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

app.get("/test", async (req, res) => {
  console.log("oki");
  try {
    const anan = await getPositionInfo("60a0f9002f6cbf50887fbc1e2");
    res.send(anan);
  } catch (error) {
    res.send(error);
  }
});

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

      const chartData = {
        labels: [
          "Finishing",
          "Volleys",
          "Crossing",
          "Short Passing",
          "Heading ",
        ],
        datasets: [
          {
            label: "Attacking",
            data: [
              result.attacking_finishing,
              result.attacking_volleys,
              result.attacking_crossing,
              result.attacking_short_passing,
              result.attacking_heading_accuracy,
            ],
            backgroundColor: "rgba(255, 0, 0, 0.5)",
          },
        ],
      };

      const chartInfo = {
        data: chartData,
        type: "radar",
      };
      const positionInfo = await getPositionInfo(id);
      const response = {
        playerData: playerData,
        playerInfo: playerInfo,
        chartData: [
          chartInfo,
          chartInfo,
          chartInfo,
          chartInfo,
          chartInfo,
          chartInfo,
          chartInfo,
          chartInfo,
          chartInfo,
          chartInfo,
          chartInfo,
          chartInfo,
        ],
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
};
