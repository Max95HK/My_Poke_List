import { Hono } from "hono";
import { cors } from "hono/cors";
import { logger } from "hono/logger";

import { processEnv } from "@/server/env";
import { pokemonRouter } from "@/server/routes/pokemon.routes";

import generationRouter from "./routes/generations.routes";
import typeRouter from "./routes/types.routes";

const app = new Hono();

app.use("*", logger());
app.use(
  "*",
  cors({
    origin: processEnv.CLIENT_URL,
  }),
);

export const router = app
  .basePath("/api")
  .route("/pokemon", pokemonRouter)
  .route("/generations", generationRouter)
  .route("/types", typeRouter);

export type AppType = typeof router;
export default app;
