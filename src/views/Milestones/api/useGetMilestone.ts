import { useApiQuery } from "hooks";

export const useGetMilestone = (milestoneId?: string) => {
  return useApiQuery({
    endpoint: "/milestone/" + milestoneId,
    options: { enabled: Boolean(milestoneId) },
    queryKey: ["milestone", String(milestoneId)],
  });
};
