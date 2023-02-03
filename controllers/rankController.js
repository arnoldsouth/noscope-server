const axios = require("axios");

const platformURL = `https://na1.api.riotgames.com`;

const getRankApi = (req, res) => {
  res.status(200).json({ "api-route-rank": "good" });
};

const getCurrentRank = async (req, res) => {
  const { name } = req.params;
  const summonerName = name.replace(" ", "").toLowerCase();
  let id = "";

  await axios
    .get(
      `${platformURL}/lol/summoner/v4/summoners/by-name/${summonerName}?api_key=${process.env.RIOT_TOKEN}`
    )
    .then((response) => {
      response.data.id;
      // console.log(response.data.id);
      id = response.data.id;
      //   console.log(id);
    })
    .catch((err) => res.json(err.status));

  //   console.log(id);

  let summonerRank = {};
  //   let rankdata = null;
  await axios
    .get(
      `${platformURL}/lol/league/v4/entries/by-summoner/${id}?api_key=${process.env.RIOT_TOKEN}`
    )
    .then((response) => {
      const rankData = response.data;
      //   rankdata = response.data;
      console.log({ responsedata: response.data });
      console.log({ rankData });
      //   summonerRank = summonerRank.push(rankData);
      summonerRank["rank"] = response.data[0].rank;
      summonerRank["tier"] = response.data[0].tier;

      console.log({ summonerRank });
    })
    .catch((err) => res.json(err.status));

  //   {
  //     tier: response.data.tier,
  //     rank: response.data.rank,
  //     leaguePoints: response.data.leaguePoints,
  //     wins: response.data.wins,
  //     losses: response.data.losses,
  //   };

  //   return res.json(summonerRank);
  console.log({ summonerRank });
  return res.json(summonerRank);
};

module.exports = { getRankApi, getCurrentRank };
