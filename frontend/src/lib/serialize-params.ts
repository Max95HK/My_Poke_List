const serializeParams = <T extends Record<string, unknown>>(
  params: T,
): Record<string, string> =>
  Object.fromEntries(
    Object.entries(params)
      .filter(([, v]) => v != null && v !== '')
      .map(([key, value]) => [key, String(value)]),
  );

export default serializeParams;
