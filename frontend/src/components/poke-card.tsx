import { useState } from "react";

import { getTypeIcon, toUpperCaseFirst } from "@/utils";

import type { Pokemon } from "@/shared/types/pokemon";

import { PokeballIcon } from "./poke-icon";

type PokecardProps = {
  pokemon: Pokemon;
};

const PokeCard = ({ pokemon }: PokecardProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  return (
    <div className="group/card bg-secondary/50 overflow-hidden rounded-tl-2xl rounded-br-2xl border-2 border-border cursor-pointer flex flex-col">
      <div className="card_header flex gap-4 bg-card/50 px-4 py-2 group-hover/card:bg-accent transition-colors">
        <PokeballIcon width={18} />
        <span className="text-white font-semibold group-hover/card:text-blue-950">
          {toUpperCaseFirst(pokemon.name)}
        </span>
      </div>

      <div className="card-content flex-1 flex items-center justify-center py-6">
        <div className="relative w-24 h-24">
          {!imageLoaded && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-8 h-8 border-2 border-white/20 border-t-white rounded-full animate-spin" />
            </div>
          )}
          <img
            src={pokemon.sprites.front_default}
            alt={pokemon.name}
            width={96}
            height={96}
            onLoad={() => setImageLoaded(true)}
            className={`transition-opacity duration-300 ${imageLoaded ? "opacity-100" : "opacity-0"}`}
          />
        </div>
      </div>

      <div className="card-footer flex gap-4 mt-3 py-2 justify-center bg-card/30">
        {pokemon.types.map((type) => (
          <div className="flex gap-2 items-center">
            {getTypeIcon(type.type.name)}{" "}
            <span className="bg-dark/80 text-white px-2 text-sm rounded-r-md">
              {toUpperCaseFirst(type.type.name)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PokeCard;
