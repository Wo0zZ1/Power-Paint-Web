import { QueryClient } from "@tanstack/react-query";

import { queryClientOptions } from "../config";

export function getQueryClient() {
  if (typeof window === "undefined") return new QueryClient(queryClientOptions);
}
