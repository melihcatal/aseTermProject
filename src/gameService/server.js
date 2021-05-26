const express = require("express");
const cors = require("cors");
const app = express();
const MongoClient = require("mongodb").MongoClient;
const ObjectId = require("mongodb").ObjectID;
const constants = require("./constants.json");
//const constants = require("./constants_dev.json");

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
          season: 2020,
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

      const result = await Promise.all(requests);
      let responses = result.map((currentResult) =>
        currentResult.data.results > 0 ? currentResult.data.response : null
      );
      responses = responses.filter((n) => n);

      resolve(responses);
    } catch (error) {
      reject(error);
    }
  });
}

function getTeamID(teamName, countryName) {
  return new Promise(async (resolve, reject) => {
    try {
      console.log("team => " + teamName + " c " + countryName);
      const match = {
        clubName: new RegExp(teamName, "i"),
        countryName: new RegExp(countryName, "i"),
      };
      const project = {
        _id: 1,
      };

      const aggregation = [
        { $match: match },
        { $project: project },
        { $limit: 1 },
      ];

      const collectionName = "teams";
      const result = await getData(collectionName, aggregation);

      if (result.length > 0) {
        resolve(result[0]._id);
      } else {
        throw "Not Found ID";
      }
    } catch (error) {
      resolve(null);
    }
  });
}

function createResponse(response) {
  return new Promise(async (resolve, reject) => {
    try {
      const leagueInfo = response[0].league;

      let games = [];

      await Promise.all(
        response.map(async (currentGame) => {
          const gameID = currentGame.fixture.id;
          const gameDate = currentGame.fixture.date;
          const gameStatus = currentGame.fixture.status.short;
          const homeTeam = currentGame.teams.home;
          const awayTeam = currentGame.teams.away;
          const gameScore =
            currentGame.goals.home + "-" + currentGame.goals.away;

          const homeTeamID = await getTeamID(homeTeam.name, leagueInfo.country);
          const awayTeamID = await getTeamID(awayTeam.name, leagueInfo.country);
          if (homeTeamID != null && awayTeamID != null) {
            homeTeam.id = homeTeamID;
            awayTeam.id = awayTeamID;

            const currentGameData = {
              gameID: gameID,
              gameDate: gameDate,
              gameStatus: gameStatus,
              homeTeam: homeTeam,
              awayTeam: awayTeam,
              gameScore: gameScore,
            };

            games.push(currentGameData);
          }
        })
      );

      const league = {
        leagueInfo: leagueInfo,
        games: games,
      };

      resolve(league);
    } catch (error) {
      resolve("Not Found ıd");
    }
  });
}
app.get("/getFixtures", async (req, res) => {
  try {
    const fromDate = req.query.fromDate;
    const toDate = req.query.toDate;

    const results = await getFixtures(fromDate, toDate);

    let requests = results.map((currentResult) =>
      createResponse(currentResult)
    );

    const response = await Promise.all(requests);

    res.status(200).send(results);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = {
  app: app,
  databaseExist: databaseExist,
  connectDatabase: connectDatabase,
  getData: getData,
  getFixtures: getFixtures,
  getTeamID: getTeamID,
  createResponse: createResponse,
};
