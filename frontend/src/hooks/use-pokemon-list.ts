/**
 * Node modules
 */
import { useQuery } from "@tanstack/react-query";

/**
 * Types
 */
import type { Pokemon,  } from "@/shared/types/pokemon";

const LIMIT = 20;
const BASE_API_URL = "https://pokeapi.co/api/v2/pokemon";

const fetchPokemonList = async (page: number): Promise<PokemonListResult> => {
  const offset = (page - 1) * LIMIT;

  const response = await fetch(
    `${BASE_API_URL}?limit=${LIMIT}&offset=${offset}`,
  );
  if (!response.ok) throw new Error(`HTTP error: ${response.status}`);

  const data: PokemonListResponse = await response.json();

  const pokemonList: Pokemon[] = await Promise.all(
    data.results.map(async ({ url }) => {
      const res = await fetch(url);
      if (!res.ok) throw new Error(`HTTP error ${res.status}`);
      return res.json() as Promise<Pokemon>;
    }),
  );

  return { pokemonList, totalCount: data.count };
};

const usePokemonList = (page: number = 1) => {
  const {
    data: pokemonList,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["pokemon", page],
    queryFn: () => fetchPokemonList(page),
  });

  return {
    pokemonList: pokemonList?.pokemonList ?? [],
    totalCount: pokemonList?.totalCount ?? 0,
    totalPages: Math.ceil((pokemonList?.totalCount ?? 0) / LIMIT),
    isLoading,
    error,
  };
};

export default usePokemonList;
