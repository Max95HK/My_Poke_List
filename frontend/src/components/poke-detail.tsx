import type { Pokemon } from "@/shared/types/pokemon";
import { useLoaderData } from "react-router";

const PokeDetail = () => {
  const pokemon = useLoaderData() as Pokemon;
  return <div>{pokemon.name}</div>;
};

export default PokeDetail;
