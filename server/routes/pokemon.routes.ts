import { Hono } from "hono";
import { and, asc, desc, eq, ilike, sql } from "drizzle-orm";

import { db } from "@/db/index";
import { generationsTable } from "@/db/schemas/generation-schema";
import { pokemonTable } from "@/db/schemas/poke-schema";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";

import {
  pokemonQuerySchema,
  type Order,
  type PokemonListApiResponse,
  type SortField,
} from "@/shared/types/pokemon";

const POKEMON_SELECT = {
  id: pokemonTable.id,
  name: pokemonTable.name,
  height: pokemonTable.height,
  weight: pokemonTable.weight,
  base_experience: pokemonTable.base_experience,
  types: pokemonTable.types,
  stats: pokemonTable.stats,
  sprites: pokemonTable.sprites,
  abilities: pokemonTable.abilities,
  cry: pokemonTable.cry,
  generation: {
    id: generationsTable.id,
    name: generationsTable.name,
    region: generationsTable.region,
  },
} as const;

const buildOrderBy = (sortBy: SortField, order: Order) => {
  const orderDirection = order === "asc" ? asc : desc;

  if (sortBy === "id") return orderDirection(pokemonTable.id);
  if (sortBy === "name") return orderDirection(pokemonTable.name);

  const statSubquery = sql<number>`(
    SELECT (elem->>'base_stat')::int
    FROM jsonb_array_elements(${pokemonTable.stats}) AS elem
    WHERE elem->'stat'->>'name' = ${sortBy}
    LIMIT 1
  )`;

  return orderDirection(statSubquery);
};

export const pokemonRouter = new Hono()
  .get(
    "/",
    zValidator("query", pokemonQuerySchema, (result, c) => {
      if (!result.success) {
        return c.json(
          {
            success: false,
            error: result.error.issues[0]?.message,
          },
          400,
        );
      }
    }),
    async (c) => {
      const { limit, offset, order, sortBy, generation, search, type } =
        c.req.valid("query");

      const where = and(
        type
          ? sql`EXISTS (
              SELECT 1 FROM jsonb_array_elements(${pokemonTable.types}) AS elem
              WHERE elem->'type'->>'name' = ${type}
            )`
          : undefined,
        generation ? eq(pokemonTable.generation_id, generation) : undefined,
        search ? ilike(pokemonTable.name, `%${search}%`) : undefined,
      );

      const orderBy = buildOrderBy(sortBy, order);

      const [pokemonList, countResult] = await Promise.all([
        db
          .select(POKEMON_SELECT)
          .from(pokemonTable)
          .innerJoin(
            generationsTable,
            eq(pokemonTable.generation_id, generationsTable.id),
          )
          .where(where)
          .orderBy(orderBy)
          .limit(limit)
          .offset(offset),

        db
          .select({ count: sql<number>`count(*)` })
          .from(pokemonTable)
          .where(where),
      ]);

      const total = Number(countResult[0]?.count ?? 0);

      return c.json<PokemonListApiResponse>({
        data: pokemonList,
        total,
        offset,
        limit,
        totalPages: Math.ceil(total / limit),
      });
    },
  )
  .get(
    "/:id",
    zValidator("param", z.object({ id: z.coerce.number() }), (result, c) => {
      if (!result.success) {
        return c.json(
          {
            success: false,
            error: result.error.issues[0]?.message,
          },
          400,
        );
      }
    }),
    async (c) => {
      const { id } = c.req.valid("param");

      const [pokemon] = await db
        .select(POKEMON_SELECT)
        .from(pokemonTable)
        .innerJoin(
          generationsTable,
          eq(pokemonTable.generation_id, generationsTable.id),
        )
        .where(eq(pokemonTable.id, id))
        .limit(1);

      if (!pokemon) {
        return c.json({ success: false, error: "Pokémon not found" }, 404);
      }

      return c.json(pokemon);
    },
  );
