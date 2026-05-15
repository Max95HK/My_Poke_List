import { useState, useEffect, useRef } from "react";
import { pokemonQuerySchema, type PokemonParams } from "@/shared/types/pokemon";
import useValidateSearchParams from "@/hooks/use-validated-search-params";

const useDebounce = (value: string, delay: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
};

const usePokemonFilter = () => {
  const { params, setParams, resetParams } =
    useValidateSearchParams(pokemonQuerySchema);

  const [searchInput, setSearchInput] = useState(params.search ?? "");
  const debouncedSearch = useDebounce(searchInput, 300);
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    setParams({
      search: debouncedSearch || undefined,
      offset: 0,
    } as Partial<PokemonParams>);
  }, [debouncedSearch]);

  const setSearch = (search: string) => setSearchInput(search);

  const setType = (type: string | undefined) =>
    setParams({ type, offset: 0 } as Partial<PokemonParams>);

  const setGeneration = (generation: number | undefined) =>
    setParams({ generation, offset: 0 } as Partial<PokemonParams>);

  const setSortBy = (sortBy: PokemonParams["sortBy"]) =>
    setParams({ sortBy, offset: 0 } as Partial<PokemonParams>);

  const setOrder = (order: PokemonParams["order"]) =>
    setParams({ order, offset: 0 } as Partial<PokemonParams>);

  const setPage = (page: number) =>
    setParams({ offset: (page - 1) * params.limit } as Partial<PokemonParams>);

  const currentPage = Math.floor(params.offset / params.limit) + 1;

  return {
    params,
    searchInput,
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