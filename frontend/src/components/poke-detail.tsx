import { useLoaderData } from "react-router";

import type { Pokemon } from "@/shared/types/pokemon";


const PokeDetail = () => {
  const pokemon = useLoaderData() as Pokemon;
  return (
    <div>
      {pokemon.name}
    </div>
  );
};

export default PokeDetail;
