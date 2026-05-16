import { z } from "zod";

export const sortBySchema = z.enum([
  "id",
  "name",
  "hp",
  "attack",
  "defense",
  "speed",
  "special-attack",
  "special-defense",
]);

export type SortField = z.infer<typeof sortBySchema>;

export const orderSchema = z.enum(["asc", "desc"]);

export type Order = z.infer<typeof orderSchema>;

export const pokemonQuerySchema = z.object({
  offset: z.coerce.number().default(0),
  limit: z.coerce.number().default(20),
  type: z.string().optional(),
  generation: z.coerce.number().optional(),
  search: z.string().optional(),
  sortBy: sortBySchema.optional().default("id"),
  order: orderSchema.optional().default("asc"),
});

export type PokemonParams = z.infer<typeof pokemonQuerySchema>;

export type PokemonType = {
  slot: number;
  type: {
    name: string;
    url: string;
  };
};

export type PokemonStat = {
  base_stat: number;
  effort: number;
  stat: {
    name: string;
    url: string;
  };
};

export type PokemonSprites = {
  front_default: string;
  other: {
    "official-artwork": {
      front_default: string;
      front_shiny: string;
    };
    showdown: {
      front_default: string;
    };
  };
};

export type PokemonAbility = {
  is_hidden: boolean;
  slot: number;
  ability: {
    name: string;
    url: string;
  };
};

export type Generation = {
  id: number;
  name: string;
  region: string;
};

export type Pokemon = {
  id: number;
  name: string;
  height: number;
  weight: number;
  base_experience: number | null;
  generation: Generation;
  types: PokemonType[];
  stats: PokemonStat[];
  sprites: PokemonSprites;
  abilities: PokemonAbility[];
  cry: string;
};

export type PokemonListApiResponse = {
  data: Pokemon[];
  total: number;
  offset: number;
  limit: number;
  totalPages: number;
};