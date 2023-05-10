const express = require("express");

require("./config/database");

const { PORT } = require("./config/env");

const pokemonRoutes = require("./routes/pokemons.routes");

const app = express();

app.use(express.json());

app.use(pokemonRoutes);

app.listen(PORT, () => {
  console.log(`API Running on port ${PORT}`);
});
