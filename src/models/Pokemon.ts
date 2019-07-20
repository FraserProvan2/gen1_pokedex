const PokeApiWrapper = require('pokedex-promise-v2');
const PokeAPI = new PokeApiWrapper();

interface PokemonInterface {
    getById: (id: number) => {};
    getByName: (name: string) => {};
}

export default class Pokemon implements PokemonInterface {

    getById(id: number) {
        return PokeAPI.getPokemonByName(id);
    }

    getByName(name: string) {
        return PokeAPI.getPokemonByName(name);
    }
}
