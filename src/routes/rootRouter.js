const express = require("express");
const rootRouter = express.Router();

rootRouter.get("/", function(req, res) {
  res.send("Hello World!");
});

module.exports = rootRouter;
