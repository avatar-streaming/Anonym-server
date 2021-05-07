require("dotenv").config();

const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const createError = require("http-errors");
const helmet = require("helmet");
const path = require("path");

const rootRouter = require("./routes/rootRouter");
const loggerLoader = require("./loaders/logger");

const app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(helmet());
app.use(cors());
app.use(cookieParser());
loggerLoader(app);

app.use("/", rootRouter);

app.use((req, res, next) => {
  next(createError(404));
});

app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  res.status(err.status || 500).json({
    result: "error",
  });
});

module.exports = app;
