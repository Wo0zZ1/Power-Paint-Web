import { queryOptions } from "@tanstack/react-query";

import { WorkspacesApi } from "./api";

export const getWorkspacesQueryOptions = (cookieString: string) =>
  queryOptions({
    queryKey: ["workspaces"],
    queryFn: () => WorkspacesApi.getAll(cookieString),
  });
