/**
 * Node modules
 */
import { hc } from "hono/client";

/**
 * Types
 */
import type { AppType } from "@/server/index";

export const client = hc<AppType>("/").api;
