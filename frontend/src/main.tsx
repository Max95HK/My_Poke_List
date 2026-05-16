/**
 * Node modules
 */
import { QueryClientProvider } from "@tanstack/react-query";
import { StrictMode } from "react";

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

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </StrictMode>,
);
