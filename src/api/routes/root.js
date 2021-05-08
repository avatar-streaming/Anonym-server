const express = require("express");
const router = express.Router();

const root = (app) => {
  app.use("/", router);

  router.get("/", (req, res) => {
    res.send("Hello World!");
  });
};

module.exports = root;
