const TrainerModel = require("../model/trainer.model");
const PokemonModel = require("../model/pokemon.model");

const list = async (req, res) => {
  const FilterTrainers = req.query;

  try {
    if (FilterTrainers) {
      const trainers = await TrainerModel.find(FilterTrainers);

      return res.status(200).json(trainers);
    }
    const trainers = await TrainerModel.find(FilterTrainers);

    return res.status(200).json(trainers);
  } catch (err) {
    return res.status(400).json({
      error: "@trainers/list",
      message: err.message || "Failed to list Trainer",
    });
  }
};

const create = async (req, res) => {
  const { name, age, location, is_leader, speciality, pokemons } = req.body;

  try {
    const pokemonsBag = await PokemonModel.find({ _id: { $in: pokemons } });

    const trainer = await TrainerModel.create({
      name,
      age,
      location,
      is_leader,
      speciality,
      pokemons: pokemonsBag,
    });

    return res.status(201).json(trainer);
  } catch (err) {
    return res.status(400).json({
      error: "@trainers/create",
      message: err.message || "Failed to create",
    });
  }
};

const getById = async (req, res) => {
  const { id } = req.params;

  try {
    const trainer = await TrainerModel.findById(id);

    if (!trainer) {
      throw new Error();
    }

    return res.json(trainer);
  } catch (err) {
    return res.status(400).json({
      error: "trainers/getById",
      message: err.message || `Trainer not found ${id}`,
    });
  }
};

const update = async (req, res) => {
  const { id } = req.params;
  const { name, age, location, is_leader, speciality, pokemons } = req.body;

  try {
    if (!id) {
      throw new Error();
    }

    const pokemonsBag = await PokemonModel.find({ _id: { $in: pokemons } });

    const trainerUpdated = await TrainerModel.findByIdAndUpdate(
      id,
      {
        name,
        age,
        location,
        is_leader,
        speciality,
        pokemons: pokemonsBag,
      },
      { new: true }
    );

    return res.status(201).json(trainerUpdated);
  } catch (err) {
    return res.status(400).json({
      error: "@trainers/update",
      message: err.message || `Trainer not found ${id}`,
    });
  }
};

const remove = async (req, res) => {
  const { id } = req.params;

  try {
    const trainerRemoved = await TrainerModel.findByIdAndDelete(id);

    if (!trainerRemoved) {
      throw new Error();
    }

    return res.status(204).send();
  } catch (err) {
    return res.status(400).json({
      error: "@trainers/remove",
      message: err.message || `Trainer not found ${id}`,
    });
  }
};

module.exports = {
  list,
  create,
  getById,
  update,
  remove,
};
