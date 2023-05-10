const express = require("express");

require("./config/database");

const { PORT } = require("./config/env");

const app = express();

app.use(express.json());

app.listen(PORT, () => {
  console.log(`API Running on port ${PORT}`);
});
