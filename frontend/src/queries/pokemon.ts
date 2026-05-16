import { queryOptions } from "@tanstack/react-query";

import type { Pokemon } from "@/shared/types/pokemon";
import { client } from "@/lib/api";

export const pokemonDetailQuery = (id: string) =>
  queryOptions({
    queryKey: ["pokemon", id],
    queryFn: async () => {
      const response = await client.pokemon[":id"].$get({ param: { id } });
      if (!response.ok) throw new Error("Pokemon not found.");
      return response.json() as Promise<Pokemon>;
    },
  });
