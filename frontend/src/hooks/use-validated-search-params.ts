import { useCallback } from "react";

import { useSearchParams } from "react-router";
import type { ZodType } from "zod";

import parseSearchParams from "@/lib/parse-search-params";
import serializeParams from "@/lib/serialize-params";

const useValidateSearchParams = <T extends Record<string, unknown>>(
  schema: ZodType<T>,
) => {
  const [searchParam, setSearchParams] = useSearchParams();

  const params = schema.parse(parseSearchParams(searchParam));

  const setParams = useCallback(
    (paramsUpdates: Partial<T>) => {
      setSearchParams((prevParams) => {
        const nextParams = {
          ...parseSearchParams(prevParams),
          ...paramsUpdates,
        };
        return serializeParams(nextParams);
      });
    },
    [setSearchParams],
  );

  const resetParams = useCallback(() => setSearchParams({}), [setSearchParams]);

  return { params, setParams, resetParams };
};

export default useValidateSearchParams;