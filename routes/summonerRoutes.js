const express = require("express");
const router = express.Router();

const {
  getSummonerApi,
  getSummonerProfile,
  getSummonerExtensive,
} = require("../controllers/summonerController");

router.get("/", getSummonerApi);
router.get("/profile/:name", getSummonerProfile);

module.exports = router;
