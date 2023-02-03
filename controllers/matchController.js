const axios = require("axios");

const regionURL = `https://americas.api.riotgames.com`;
const platformURL = `https://na1.api.riotgames.com`;

const getMatchApi = (req, res) => {
  res.status(200).json({ "api-route-match": "good" });
};

const getMatchHistory = async (req, res) => {
  const { name, count } = req.params;
  let puuid = "";
  let matchIds = [];

  const summonerName = name.replace(" ", "").toLowerCase();

  await axios
    .get(
      `${platformURL}/lol/summoner/v4/summoners/by-name/${summonerName}?api_key=${process.env.RIOT_TOKEN}`
    )
    .then((response) => {
      response.data.puuid;
      // console.log(response.data.puuid);
      // console.log(puuid);
      puuid = response.data.puuid;
    })
    .catch((err) => res.json(err.status));

  // console.log(puuid);

  await axios
    .get(
      `${regionURL}/lol/match/v5/matches/by-puuid/${puuid}/ids?start=0&count=${count}&api_key=${process.env.RIOT_TOKEN}`
    )
    .then((response) => {
      matchIds = response.data;
      console.log(matchIds);
    })
    .catch((err) => res.json(err.status));

  let matchDataArray = [];
  for (let i = 0; i < matchIds.length; i++) {
    const gameId = matchIds[i];
    const matchData = await axios
      .get(
        `${regionURL}/lol/match/v5/matches/${gameId}?api_key=${process.env.RIOT_TOKEN}`
      )
      .then((response) => response.data)
      .catch((err) => res.json(err.status));

    matchDataArray.push(matchData);

    return res.json(matchDataArray);
  }
};

module.exports = { getMatchApi, getMatchHistory };
