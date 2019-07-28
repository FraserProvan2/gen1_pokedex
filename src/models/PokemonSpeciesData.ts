export default interface PokemonSpeciesData {
  evolution_chain: {
    url: string;
  };
  flavor_text_entries: [
    {
      language: {
        name: string;
      };
      flavor_text: string;
    }
  ];
}
