const express = require("express");
const { getStreamings } = require("../controllers/streamings");

const router = express.Router();

const root = (app) => {
  app.use("/", router);

  router.get("/", getStreamings);
};

module.exports = root;
