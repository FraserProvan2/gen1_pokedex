export default interface PokemonSpeciesData {
  flavor_text_entries: [
    {
      language: {
        name: string;
      };
      flavor_text: string;
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
