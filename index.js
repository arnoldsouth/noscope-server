const express = require("express");
const dotenv = require("dotenv").config();
const cors = require("cors");
const port = process.env.PORT || 6000;

const summonerRoutes = require("./routes/summonerRoutes");
const matchRoutes = require("./routes/matchRoutes");
const rankRoutes = require("./routes/rankRoutes");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cors());

app.get("/api/", (req, res) => {
  res.json({ "api-route-main": "good" });
});

app.use("/api/summoner", summonerRoutes);
app.use("/api/match", matchRoutes);
app.use("/api/rank", rankRoutes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
