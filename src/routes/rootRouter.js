const express = require("express");
const rootRouter = express.Router();

rootRouter.get("/", (req, res) => {
  res.send("Hello World!");
});

module.exports = rootRouter;
