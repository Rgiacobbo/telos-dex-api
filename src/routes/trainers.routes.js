const { Router } = require("express");

const trainersController = require("../controllers/trainers.controller");

const routes = Router();

routes.get("/trainers", trainersController.list);

routes.post("/trainers", trainersController.create);

routes.get("/trainers/:id", trainersController.getById);

routes.put("/trainers/:id", trainersController.update);

routes.delete("/trainers/:id", trainersController.remove);

module.exports = routes;
