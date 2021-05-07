const app = require("./app");

const handleListening = () => {
  console.log(`✅ Listening on: http://localhost:${process.env.PORT}`);
};

app.listen(process.env.PORT, handleListening);
