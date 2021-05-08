const app = require("./app");
require("./loaders/db");

const handleListening = () => {
  console.log(`✅ Listening on: http://localhost:${process.env.PORT}`);
};

app
  .listen(process.env.PORT, handleListening)
  .on("error", (err) => {
    console.log(err);
  });
