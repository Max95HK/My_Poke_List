import { useContext } from "react";

import { PokeContext } from "@/contexts/poke-context";

export const usePokeContext = () => {
  const context = useContext(PokeContext);
  if (!context)
    throw new Error("usePokeContext must be used within PokeProvider");
  return context;
};
