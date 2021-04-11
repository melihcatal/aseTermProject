const express = require("express");
const MongoClient = require("mongodb").MongoClient;
require("dotenv").config();

const app = express();

const port = 3000;

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
  projection = {}
) {
  return new Promise(async (resolve, reject) => {
    try {
      const database = await connectDatabase(process.env.MONGO_DATABASE);

      const result = await database
        .collection(collectionName)
        .find(condition)
        .project(projection)
        .sort({ [sortField]: sortBy })
        .limit(limit)
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

function getDataByID(collectionName, id) {
  return new Promise(async (resolve, reject) => {
    try {
      const database = await connectDatabase(process.env.MONGO_DATABASE);
      const condition = {
        _id: id,
      };

      const result = await database
        .collection(collectionName)
        .find(condition)
        .toArray();

      if (result.length > 0) {
        resolve(result);
      } else {
        resolve("Not Found");
      }
    } catch (error) {
      reject("Error");
    }
  });
}

app.get("/searchPlayer/:playerName", async (req, res) => {
  try {
    const playerName = req.params.playerName;
    const collectionName = "players";
    const sortField = "age";
    const sortBy = -1;
    const limit = 0;
    const textArray = playerName.split(" ");
    let regexArray = [];

    //create regex array for each word
    textArray.map((currentText) => {
      regexArray.push(new RegExp(currentText, "i"));
    });
    //prettier-ignore
    const condition = {
      name: {
        $all: regexArray,
      },
    };

    const searchResult = await getData(
      collectionName,
      sortField,
      sortBy,
      limit,
      condition
    );

    if (searchResult != "Not Found") {
      res.status(200).send(searchResult);
    } else {
      res.status(404).send("Not Found");
    }
  } catch (error) {
    res.status(500).send("Server Error");
  }
});

app.get("/getPlayer/:id", async (req, res) => {
  try {
    const collectionName = "players";
    const id = parseInt(req.params.id);
    const result = await getDataByID(collectionName, id);

    if (result != "Not Found") {
      res.status(200).send(result);
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
  getData: getData,
  getDataByID: getDataByID,
};
