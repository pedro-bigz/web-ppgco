import { useApiQuery } from "hooks";

export function useGetResearchLine(researchLineId?: string) {
  return useApiQuery({
    endpoint: "/research-lines/" + researchLineId,
    options: { enabled: Boolean(researchLineId) },
    queryKey: ["research-lines", String(researchLineId)],
  });
}
