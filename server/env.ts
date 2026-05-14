import * as z from "zod";

const EnvSchema = z.object({
  DATABASE_URL: z.url(),
  CLIENT_URL: z.url(),
});

const processEnv = EnvSchema.parse(process.env);

export { processEnv };
