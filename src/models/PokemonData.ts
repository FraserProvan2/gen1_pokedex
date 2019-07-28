export default interface PokemonData {
  id: number;
  name: string;
  sprites: {
    front_default: string;
    front_shiny: string;
  };
  height: string;
  weight: string;
  abilities: [];
  base_experience: number;
  moves: string[];
  species: {
    url: string;
  };
  types: [
    {
      slot: number;
      type: {
        name: string;
      };
    },
    {
      slot: number;
      type: {
        name: string;
      };
    }
  ];
}
