import type { LoaderFunction } from "react-router";

import type { Generation } from "@/shared/types/pokemon";
import { client } from "@/lib/api";

export const rootLoader = (async () => {
  const [generationsRes, typesRes] = await Promise.all([
    client.generations.$get(),
    client.types.$get(),
  ]);

  const [generations, types] = await Promise.all([
    generationsRes.json() as Promise<Generation[]>,
    typesRes.json() as Promise<string[]>,
  ]);

  return { generations, types };
}) satisfies LoaderFunction;

export type RootLoaderData = Awaited<ReturnType<typeof rootLoader>>;
