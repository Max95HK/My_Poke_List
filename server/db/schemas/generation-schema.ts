import { relations } from "drizzle-orm";
import { integer, pgTable, varchar } from "drizzle-orm/pg-core";

import { pokemonTable } from "./poke-schema";

export const generationsTable = pgTable("generations", {
  id: integer("id").primaryKey(),
  name: varchar("name", { length: 50 }).notNull(),
  region: varchar("region", { length: 50 }).notNull(),
});

export const generationsRelations = relations(generationsTable, ({ many }) => ({
  pokemon: many(pokemonTable),
}));
