const express = require("express");
const UserController = require("../controllers/user");

const router = express.Router();

const user = (app) => {
  app.use("/user", router);

  router.put("/:id", UserController.updateUserName);
};

module.exports = user;
