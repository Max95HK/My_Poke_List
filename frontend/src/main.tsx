/**
 * Node modules
 */
import { StrictMode } from "react";
import { QueryClientProvider } from "@tanstack/react-query";

/**
 * Router
 */
import router from "@/routes";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router";

/**
 * Styles
 */
import "./index.css";

import { queryClient } from "./lib/query-client";
import { PokemonProvider } from "./providers/poke-provider";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <PokemonProvider>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </PokemonProvider>
  </StrictMode>,
);
