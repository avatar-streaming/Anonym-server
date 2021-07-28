const express = require("express");
const UserController = require("../controllers/user");

const router = express.Router();

const user = (app) => {
  app.use("/user", router);

  router.patch("/userName/:id", UserController.updateUserName);
  router.patch("/userThumnail/:id", UserController.updateUserThumnail);
  router.patch("/follow/:id", UserController.followUser);
  router.patch("/unfollow/:id", UserController.unfollowUser);
};

module.exports = user;
