const express = require("express");
const MongoClient = require("mongodb").MongoClient;
const ObjectId = require("mongodb").ObjectID;

require("dotenv").config({
  path: "../../.env",
});
const cors = require("cors");

const app = express();
app.use(cors());

function databaseExist(databaseName) {
  return new Promise(async (resolve, reject) => {
    const databaseUrl = `mongodb://${process.env.MONGO_IP}/${databaseName}`;
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

function textRegex(text) {
  const textArray = text.split(" ");

  let regexArray = [];

  //create regex array for each word
  textArray.map((currentText) => {
    regexArray.push(new RegExp(currentText, "i"));
  });

  return regexArray;
}

app.get("/searchPlayer/:playerName", async (req, res) => {
  try {
    const playerName = req.params.playerName;
    const collectionName = "players";
    const sortField = "overall";
    const sortBy = -1;
    const limit = 5;
    const group = {
      _id: "$sofifa_id",
      playerID: { $last: "$_id" },
      name: { $last: "$long_name" },
      year: { $max: "$year" },

      overall: { $max: "$overall" },
      imageUrl: { $last: "$imageUrl" },
    };
    const projection = null;

    const regexArray = textRegex(playerName);

    //prettier-ignore
    const condition = {
      long_name: {
        $all: regexArray,
      },
    };

    const searchResult = await getData(
      collectionName,
      sortField,
      sortBy,
      limit,
      condition,
      projection,
      group
    );

    if (searchResult != "Not Found") {
      res.status(200).send(searchResult);
    } else {
      res.status(404).send("Not Found");
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

app.get("/anan", (req, res) => {
  res.send("anan");
});
module.exports = {
  app: app,
  databaseExist: databaseExist,
  connectDatabase: connectDatabase,
  getData: getData,
};
