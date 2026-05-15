import { useQuery } from "@tanstack/react-query";

import type {
  PokemonListApiResponse,
  pokemonQuerySchema,
} from "@/shared/types/pokemon";
import { client } from "@/lib/api";

