import { useQuery } from "@tanstack/react-query";

import { WorkspacesApi } from "./api";

export const WORKSPACES_QUERY_KEY = "workspaces";

export const useGetWorkspacesQuery = () => {
  return useQuery({
    queryKey: [WORKSPACES_QUERY_KEY],
    queryFn: () => WorkspacesApi.getAll(),
  });
};
