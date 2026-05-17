import { createContext } from "react";

import type { Pokemon } from "@/shared/types/pokemon";

type PokemonContext = {
  team: Pokemon[];
  addToTeam: (pokemon: Pokemon) => void;
  removeFromTeam: (id: number) => void;
  clearTeam: () => void;
};

export const PokeContext = createContext<PokemonContext | null>(null);
