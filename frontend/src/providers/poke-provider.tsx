import { useCallback, type ReactNode } from "react";

import { PokeContext } from "@/contexts/poke-context";

import useLocalStorage from "@/hooks/use-localstorage";
import type { Pokemon } from "@/shared/types/pokemon";

export const PokemonProvider = ({ children }: { children: ReactNode }) => {
  const {
    value: team,
    setValue: setTeam,
    remove: clearTeam,
  } = useLocalStorage<Pokemon[]>("team", []);

  const addToTeam = useCallback((pokemon: Pokemon) => {
    setTeam((prevTeam) => [...prevTeam, pokemon]);
  }, [setTeam]);

  const removeFromTeam = useCallback((id: number) => {
    setTeam((prevTeam) => prevTeam.filter((pokemon) => pokemon.id !== id));
  }, [setTeam]);

  return (
    <PokeContext.Provider
      value={{ team, addToTeam, removeFromTeam, clearTeam }}
    >
      {children}
    </PokeContext.Provider>
  );
};
