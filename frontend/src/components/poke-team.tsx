import { usePokeContext } from "@/hooks/use-poke-context";

import PokeCard from "./poke-card";

const PokeTeam = () => {
  const { team } = usePokeContext();
  return (
    <div className="grid gap-4 grid-cols-[repeat(auto-fit,minmax(200px,1fr))]">
      {team.map((pokemon) => (
        <PokeCard pokemon={pokemon} />
      ))}
    </div>
  );
};

export default PokeTeam;
