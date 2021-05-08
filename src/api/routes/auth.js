const express = require("express");
const { postLogin, postCheckAuth } = require("../controllers/auth");

const router = express.Router();

const auth = (app) => {
  app.use("/auth", router);

  router.post("/check", postCheckAuth);
  router.post("/login", postLogin);
  router.get("/logout", (req, res) => {
    res.send("Hello World!");
  });
};

module.exports = auth;
