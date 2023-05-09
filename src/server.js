const express = require("express");

const { PORT } = require("./config/env");

const app = express();

app.use(express.json());

app.listen(PORT, () => {
  console.log(`API Running on port ${PORT}`);
});
