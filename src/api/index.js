const root = require("./routes/root");
const auth = require("./routes/auth");
const streaming = require("./routes/streaming");

const setRoutes = (app) => {
  root(app);
  auth(app);
  streaming(app);
};

module.exports = setRoutes;
