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
  moves: [
    {
      move:
      {
        name: string
      },
      version_group_details: [{
        level_learned_at: number
      }
      ]
    }
  ];
  species: {
    url: string;
  };
  types: [
    {
      slot: number;
      type: {
        name: string;
      };
    }
  ];
  stats: [
    {
      base_stat: number;
      stat: {
        name: string;
      };
    }
  ];
}
