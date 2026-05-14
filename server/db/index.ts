import { drizzle } from "drizzle-orm/node-postgres";

import {
  generationsRelations,
  generationsTable,
} from "@/server/db/schemas/generation-schema";
import {
  pokemonRelations,
  pokemonTable,
} from "@/server/db/schemas/poke-schema";
import { processEnv } from "@/server/env";
import { Pool } from "pg";

const pool = new Pool({
  connectionString: processEnv.DATABASE_URL,
});

const db = drizzle({
  client: pool,
  schema: {
    pokemonTable,
    generationsTable,
    pokemonRelations,
    generationsRelations,
  },
});

export { pool, db };
