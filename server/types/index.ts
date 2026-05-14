export type GenerationRaw = {
  id: number;
  name: string;
  main_region: {
    name: string;
    url: string;
  };
  pokemon_species: {
    name: string;
    url: string;
  }[];
};

export type PokemonRaw = {
  id: number;
  name: string;
  height: number;
  weight: number;
  base_experience: number;
  types: {
    slot: number;
    type: { name: string; url: string };
  }[];
  stats: {
    base_stat: number;
    effort: number;
    stat: { name: string; url: string };
  }[];
  sprites: {
    front_default: string;
    other: {
      'official-artwork': {
        front_default: string;
        front_shiny: string;
      };
      showdown: {
        front_default: string;
      };
    };
  };
  abilities: {
    is_hidden: boolean;
    slot: number;
    ability: { name: string; url: string };
  }[];
  cries: { latest: string; legacy: string };
};

export type PokemonListResponse = {
  count: number;
  results: { name: string; url: string }[];
};