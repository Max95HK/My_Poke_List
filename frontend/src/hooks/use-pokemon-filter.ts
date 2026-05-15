import { pokemonQuerySchema, type PokemonParams } from "@/shared/types/pokemon";
import useValidateSearchParams from "@/hooks/use-validated-search-params";

const usePokemonFilter = () => {
  const { params, setParams, resetParams } =
    useValidateSearchParams(pokemonQuerySchema);

  const setSearch = (search: string) =>
    setParams({
      search: search || undefined,
      offset: 0,
    } as Partial<PokemonParams>);

  const setType = (type: string | undefined) =>
    setParams({ type, offset: 0 } as Partial<PokemonParams>);

  const setGeneration = (generation: number | undefined) =>
    setParams({ generation, offset: 0 } as Partial<PokemonParams>);

  const setSortBy = (sortBy: PokemonParams["sortBy"]) =>
    setParams({ sortBy, offset: 0 } as Partial<PokemonParams>);

  const setOrder = (order: PokemonParams["order"]) => {
    setParams({ order, offset: 0 } as Partial<PokemonParams>);
  };

  const setPage = (page: number) =>
    setParams({ offset: (page - 1) * params.limit } as Partial<PokemonParams>);

  const currentPage = Math.floor(params.offset / params.limit) + 1;

  return {
    params,
    currentPage,
    setGeneration,
    setType,
    setSearch,
    setSortBy,
    setOrder,
    setPage,
    resetParams,
  };
};

export default usePokemonFilter;