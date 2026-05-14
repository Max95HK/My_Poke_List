import { processEnv } from "@/server/env";
import { defineConfig } from "drizzle-kit";

export default defineConfig({
  out: "./server/db/migrations",
  schema: "./server/db/schemas/*",
  dialect: "postgresql",
  dbCredentials: {
    url: processEnv.DATABASE_URL,
  },
});
