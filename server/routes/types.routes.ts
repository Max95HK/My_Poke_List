import { Hono } from "hono";
import { sql } from "drizzle-orm";

import { db } from "@/db/index";

const typeRouter = new Hono().get("/", async (c) => {
  const result = await db.execute(sql`
    SELECT DISTINCT elem->'type'->>'name' AS name
    FROM pokemon, jsonb_array_elements(types) AS elem
    ORDER BY name ASC
  `);

  return c.json(result.rows.map((r) => r.name));
});

export default typeRouter;
