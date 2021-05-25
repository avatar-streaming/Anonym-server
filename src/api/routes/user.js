const express = require("express");
const UserController = require("../controllers/user");

const router = express.Router();

const user = (app) => {
  app.use("/user", router);

  router.put("/userName/:id", UserController.updateUserName);
  router.put("/follow/:id", UserController.followUser);
};

module.exports = user;
