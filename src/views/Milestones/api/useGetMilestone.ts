import { useApiQuery } from "core";

export function useGetMilestone(milestoneId?: string) {
  return useApiQuery({
    endpoint: "/milestones/" + milestoneId,
    options: { enabled: Boolean(milestoneId) },
    queryKey: ["milestones", String(milestoneId)],
  });
}
