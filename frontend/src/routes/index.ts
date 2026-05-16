import RootLayout from "@/layout/root-layout";
import { rootLoader } from "@/loaders/root-loader";
import Home from "@/pages/home";
import { pokemonDetailQuery } from "@/queries/pokemon";
import { createBrowserRouter } from "react-router";

import { queryClient } from "@/lib/query-client";
import PokeDetail from "@/components/poke-detail";

const router = createBrowserRouter([
  {
    id: "root",
    path: "/",
    Component: RootLayout,
    loader: rootLoader,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "/pokemon/:id",
        Component: PokeDetail,
        loader: async ({ params }) => {
          const id = params.id as string;
          const data = await queryClient.ensureQueryData(
            pokemonDetailQuery(id),
          );
          return data;
        },
      },
    ],
  },
]);

export default router;
