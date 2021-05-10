const express = require("express");
const StremingController = require("../controllers/streamings");

const router = express.Router();

const root = (app) => {
  app.use("/", router);

  router.get("/", StremingController.getStreamings);
};

module.exports = root;
