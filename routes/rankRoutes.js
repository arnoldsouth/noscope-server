const express = require("express");
const router = express.Router();

const { getRankApi, getCurrentRank } = require("../controllers/rankController");

router.get("/", getRankApi);
router.get("/current/:name", getCurrentRank);

module.exports = router;
