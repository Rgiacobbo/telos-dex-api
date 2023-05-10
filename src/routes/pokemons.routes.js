const { Router } = require("express");

const pokemonsController = require("../controllers/pokemons.controller");

const routes = Router();

routes.get("/pokemons", pokemonsController.list);

routes.post("/pokemons", pokemonsController.create);

routes.get("/pokemons/:id", pokemonsController.getById);

routes.put("/pokemons/:id", pokemonsController.update);

routes.delete("/pokemons/:id", pokemonsController.remove);

module.exports = routes;
