const root = require("./routes/root");
const auth = require("./routes/auth");

const setRoutes = (app) => {
  root(app);
  auth(app);
};

module.exports = setRoutes;
