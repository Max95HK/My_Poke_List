import { relations } from "drizzle-orm";
import { integer, jsonb, pgTable, text, varchar } from "drizzle-orm/pg-core";

import { generationsTable } from "@/server/db/schemas/generation-schema";

import type {
  PokemonAbility,
  PokemonSprites,
  PokemonStat,
  PokemonType,
} from "@/shared/types/pokemon";

export const pokemonTable = pgTable("pokemon", {
  id: integer("id").primaryKey(),
  name: varchar("name", { length: 100 }).notNull(),
  height: integer("height").notNull(),
  weight: integer("weight").notNull(),
  base_experience: integer("base_experience"),
  types: jsonb("types").$type<PokemonType[]>().notNull(),
  stats: jsonb("stats").$type<PokemonStat[]>().notNull(),
  sprites: jsonb("sprites").$type<PokemonSprites>().notNull(),
  abilities: jsonb("abilities").$type<PokemonAbility[]>().notNull(),
  cry: text("cry").notNull(),
  generation_id: integer("generation_id")
    .notNull()
    .references(() => generationsTable.id),
});

export const pokemonRelations = relations(pokemonTable, ({ one }) => ({
  genration: one(generationsTable, {
    fields: [pokemonTable.generation_id],
    references: [generationsTable.id],
  }),
}));
