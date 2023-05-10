const PokemonModel = require("../model/pokemon.model");

const list = async (req, res) => {
  const FilterPokemons = req.query;

  try {
    if (FilterPokemons) {
      const pokemons = await PokemonModel.find(FilterPokemons);

      return res.status(200).json(pokemons);
    }
    const pokemons = await PokemonModel.find(FilterPokemons);

    return res.status(200).json(pokemons);
  } catch (err) {
    return res.status(400).json({
      error: "@pokemons/list",
      message: err.message || "Failed to list Pokemons",
    });
  }
};

const getById = async (req, res) => {
  const { id } = req.params;

  try {
    const pokemon = await PokemonModel.findById(id);

    if (!pokemon) {
      throw new Error();
    }

    return res.json(pokemon);
  } catch (err) {
    return res.status(400).json({
      error: "pokemons/getById",
      message: err.message || `Pokemon not found ${id}`,
    });
  }
};

const create = async (req, res) => {
  const { name, attack, defense, speed, hp, type1, type2, is_legendary } =
    req.body;

  const lastPokemon = await PokemonModel.findOne(
    {},
    { pokedex_number: 1, _id: 0 }
  ).sort({ pokedex_number: -1 });

  const numPokedex = lastPokemon ? lastPokemon.pokedex_number + 1 : 1;

  try {
    const pokemon = await PokemonModel.create({
      name,
      pokedex_number: numPokedex,
      attack,
      defense,
      speed,
      hp,
      type1,
      type2,
      is_legendary,
    });

    return res.status(201).json(pokemon);
  } catch (err) {
    return res.status(400).json({
      error: "pokemons/create",
      message: err.message || "Failed to create a pokemon",
    });
  }
};

const update = async (req, res) => {
  const { id } = req.params;
  const { name, attack, defense, speed, hp, type1, type2, is_legendary } =
    req.body;

  try {
    const pokemonUpdated = await PokemonModel.findByIdAndUpdate(
      id,
      {
        name,
        attack,
        defense,
        speed,
        hp,
        type1,
        type2,
        is_legendary,
      },
      { new: true }
    );
    return res.json(pokemonUpdated);
  } catch (err) {
    return res.status(400).json({
      error: "@pokemons/update",
      mesage: err.message || `Pokemon not found ${id}`,
    });
  }
};

const remove = async (req, res) => {
  const { id } = req.params;

  try {
    const pokemonRemoved = await PokemonModel.findByIdAndDelete(id);

    if (!pokemonRemoved) {
      throw new Error();
    }

    return res.status(204).send();
  } catch (err) {
    return res.status(400).json({
      error: "@pokemons/remove",
      message: err.message || `Pokemon not found ${id}`,
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
