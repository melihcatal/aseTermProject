const express = require("express");
const cors = require("cors");
const app = express();
const MongoClient = require("mongodb").MongoClient;
const ObjectId = require("mongodb").ObjectID;
const constants = require("./constants.json");
const axios = require("axios");

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

function getFixtures(fromDate, toDate) {
  return new Promise(async (resolve, reject) => {
    try {
      const fixtureUrl = "https://api-football-v1.p.rapidapi.com/v3/fixtures";

      let paramsList = [];
      constants.leagues.map((currentLeague) => {
        const params = {
          league: currentLeague.leagueID,
          season: 2021,
          from: fromDate,
          to: toDate,
          timezone: process.env.FOOTBALL_API_TIMEZONE,
        };
        paramsList.push(params);
      });

      const headers = {
        "x-rapidapi-key": process.env.FOOTBALL_API_KEY,
        "x-rapidapi-host": process.env.FOOTBALL_API_HOST,
      };

      let requests = paramsList.map((currentParams) =>
        axios.get(fixtureUrl, {
          headers: headers,
          params: currentParams,
        })
      );

      //   //const result = paramsList.length;
      //   const result = await Promise.all(requests);
      //   let responses = result.map((currentResult) => currentResult.data);
      resolve(requests.length.toString());
    } catch (error) {
      reject(error);
    }
  });
}
app.get("/test", async (req, res) => {
  const agg = [
    {
      $group: {
        _id: "$countryName",
        clubs: {
          $addToSet: "$clubName",
        },
      },
    },
    {
      $project: {
        count: {
          $size: "$clubs",
        },
        isBig: {
          $gt: [
            {
              $size: "$clubs",
            },
            10,
          ],
        },
      },
    },
    {
      $group: {
        _id: "$isBig",
        countries: {
          $addToSet: "$_id",
        },
      },
    },
    {
      $match: {
        _id: true,
      },
    },
    {
      $project: {
        _id: 0,
      },
    },
  ];

  const fromDate = req.query.fromDate;
  const toDate = req.query.toDate;

  const results = await getFixtures(fromDate, toDate);
  res.send(results);
});
module.exports = {
  app: app,
};
