import { useQuery } from "@tanstack/react-query";

import type {
  PokemonListApiResponse,
  PokemonParams,
} from "@/shared/types/pokemon";
import { client } from "@/lib/api";
import serializeParams from "@/lib/serialize-params";

const usePokemonList = (params: PokemonParams) => {
  const {
    data: pokemonList,
    isLoading,
    isPlaceholderData,
    error,
  } = useQuery({
    queryKey: ["pokemon", params],
    queryFn: async () => {
      const response = await client.pokemon.$get({
        query: serializeParams(params),
      });
      return response.json() as Promise<PokemonListApiResponse>;
    },
    placeholderData: (prevData) => prevData,
  });

  return {
    pokemon: pokemonList?.data ?? [],
    total: pokemonList?.total ?? 0,
    totalPages: pokemonList?.totalPages ?? 0,
    isLoading,
    isPlaceholderData,
    error,
  };
};

export default usePokemonList;
