const express = require("express");
const router = express.Router();

const {
  getMatchApi,
  getMatchHistory,
} = require("../controllers/matchController");

router.get("/", getMatchApi);
// router.get("/recent/:puuid&:count", getMatchHistory);
router.get("/recent/:name&:count", getMatchHistory);

module.exports = router;
