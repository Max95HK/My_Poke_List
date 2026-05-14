// server/src/routes/generationsTable.ts
import { Hono } from "hono";
import { asc } from "drizzle-orm";

import { db } from "@/db/index";
import { generationsTable } from "@/db/schemas/generation-schema";

const generationRouter = new Hono().get("/", async (c) => {
  const data = await db
    .select()
    .from(generationsTable)
    .orderBy(asc(generationsTable.id));

  return c.json(data);
});

export default generationRouter;
