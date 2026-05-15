import type { RootLoaderData } from "@/loaders/root-loader";
import { useRouteLoaderData } from "react-router";

const useRootLoaderData = () => {
  return useRouteLoaderData("root") as RootLoaderData;
};

export default useRootLoaderData;