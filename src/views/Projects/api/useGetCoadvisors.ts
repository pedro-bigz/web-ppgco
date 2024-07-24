import { useApiQuery } from "core";

export function useGetCoadvisors(projectId: number) {
  return useApiQuery({
    endpoint: "/projects/" + projectId + "/coadvisors",
    options: { enabled: Boolean(projectId) },
    queryKey: ["projects", String(projectId), "coadvisors"],
  });
}
