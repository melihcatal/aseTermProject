const express = require("express");
const cors = require("cors");
const axios = require("axios");
const { response } = require("express");
const app = express();
app.use(cors());
require("dotenv").config({
  path: "../../.env",
});

function getFixtureById(id) {
  return new Promise(async (resolve, reject) => {
    try {
      const endPoint = `https://api-football-v1.p.rapidapi.com/v2/fixtures/id/${id}?timezone=${process.env.FOOTBALL_API_TIMEZONE}`;
      const options = {
        headers: {
          "x-rapidapi-key": process.env.FOOTBALL_API_KEY,
          "x-rapidapi-post": process.env.FOOTBALL_API_HOST,
        },
      };

      const fixtureResults = await axios.get(endPoint, options);

      if (fixtureResults.data.api.results > 0) {
        const results = fixtureResults.data.api.fixtures[0];
        const gameTimestamp = results.event_timestamp;
        const date = new Date(gameTimestamp * 1000);
        const gameHour = date.getHours();
        const gameMinute = date.getMinutes();

        const startTime = gameHour + ":" + gameMinute;

        const gameInfo = {
          gameID: results.fixture_id,
          homeTeam: results.homeTeam,
          awayTeam: results.awayTeam,
          startTime: startTime,
        };
        resolve(gameInfo);
      } else {
        throw "Not Found";
      }
    } catch (err) {
      reject(err);
    }
  });
}

module.exports = {
  app: app,
  getFixtureById: getFixtureById,
};
